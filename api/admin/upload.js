import { put } from '@vercel/blob';
import { json, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/**
 * Admin image upload. Client posts the raw file body with ?filename=...
 *
 *   await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
 *     method: 'POST', body: file, credentials: 'include',
 *   })
 *
 * Returns { url } pointing at the public Vercel Blob URL.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  try {
    requireAdmin(req);

    const filename = String(req.query?.filename || '').trim();
    if (!filename) return badRequest(res, 'filename_required');

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const e = new Error('BLOB_READ_WRITE_TOKEN not configured');
      e.status = 503;
      throw e;
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

    const blob = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: req.headers['content-type'] || 'application/octet-stream',
    });

    return json(res, 200, { url: blob.url });
  } catch (err) {
    serverError(res, err);
  }
}
