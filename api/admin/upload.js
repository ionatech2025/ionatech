import { put } from '@vercel/blob';
import { json, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

// Allow-list of image types we render on the public site. Mirrors the
// extensions the editor's <ImageField> accepts. SVG is intentionally excluded
// because it can carry script payloads.
const ALLOWED_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']);

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
]);

// Canonical extension for each detected MIME — used to normalize the
// uploaded filename so we never store .png bytes under a .jpg name.
const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

// First-bytes magic numbers. Trusting Content-Type from the client alone is
// unsafe — a .php pretending to be image/png still uploads. Inspecting the
// file header gives us a real check that the bytes match an image format we
// know how to serve.
function detectMime(buffer) {
  if (buffer.length < 12) return null;
  const b = buffer;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  // JPEG: FF D8 FF
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  // GIF: 47 49 46 38 (GIF8)
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return 'image/gif';
  // WEBP: RIFF....WEBP
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) return 'image/webp';
  // AVIF: ....ftypavif (offset 4..11)
  if (
    b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70 &&
    ((b[8] === 0x61 && b[9] === 0x76 && b[10] === 0x69 && b[11] === 0x66) ||
     (b[8] === 0x61 && b[9] === 0x76 && b[10] === 0x69 && b[11] === 0x73))
  ) return 'image/avif';
  return null;
}

function safeFilename(raw) {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;
  // Strip path components and reject traversal characters.
  const base = trimmed.split(/[\\/]/).pop();
  if (!base || base.startsWith('.') || base.includes('\0')) return null;
  // Whitelist: letters, digits, underscore, dash, dot.
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, '_');
  if (cleaned.length === 0 || cleaned.length > 200) return null;
  const dot = cleaned.lastIndexOf('.');
  if (dot < 0) return null;
  const ext = cleaned.slice(dot + 1).toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) return null;
  return cleaned;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  try {
    requireAdmin(req);

    const filename = safeFilename(req.query?.filename);
    if (!filename) return badRequest(res, 'invalid_filename');

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const e = new Error('BLOB_READ_WRITE_TOKEN not configured');
      e.status = 503;
      throw e;
    }

    // The Content-Type header is advisory only — browsers send
    // `application/octet-stream` for files where File.type is empty, and we
    // can't trust client-set types anyway. Magic-byte detection on the
    // buffered body is the real allow-list. We do, however, reject up front
    // when the client *claims* a type that isn't an allowed image (lets us
    // fail fast on obvious misuse without buffering the body).
    const headerType = String(req.headers['content-type'] || '')
      .toLowerCase()
      .split(';')[0]
      .trim();
    const headerIsClaimedImage = headerType.startsWith('image/');
    if (headerIsClaimedImage && !ALLOWED_MIME.has(headerType)) {
      return badRequest(res, 'unsupported_content_type');
    }

    // Buffer the body so we can enforce a size limit before pushing to Blob.
    const chunks = [];
    let total = 0;
    for await (const chunk of req) {
      total += chunk.length;
      if (total > MAX_BYTES) return badRequest(res, 'file_too_large');
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    if (buffer.length === 0) return badRequest(res, 'empty_body');

    const detected = detectMime(buffer);
    if (!detected) return badRequest(res, 'unrecognized_image');
    // Only enforce a header/body match when the client gave us a real image
    // MIME; octet-stream / empty / non-image headers are tolerated.
    if (headerIsClaimedImage && headerType !== detected) {
      return badRequest(res, 'content_type_mismatch');
    }

    // Normalize the stored filename to the canonical extension for the
    // detected type so we never end up with foo.jpg holding PNG bytes.
    const dot = filename.lastIndexOf('.');
    const claimedExt = filename.slice(dot + 1).toLowerCase();
    const canonicalExt = MIME_TO_EXT[detected];
    const expectedAliases = canonicalExt === 'jpg' ? ['jpg', 'jpeg'] : [canonicalExt];
    const finalFilename = expectedAliases.includes(claimedExt)
      ? filename
      : `${filename.slice(0, dot)}.${canonicalExt}`;

    const blob = await put(finalFilename, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: detected,
    });

    return json(res, 200, { url: blob.url });
  } catch (err) {
    serverError(res, err);
  }
}
