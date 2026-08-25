import { put } from '@vercel/blob';
import { db } from '../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin, readJson } from '../_lib/auth.js';
import {
  AboutPatch,
  ContactPatch,
  ProductCreate,
  ProductUpdate,
  ProjectCreate,
  ProjectUpdate,
  ServiceCreate,
  ServiceUpdate,
  TeamCreate,
  TeamUpdate,
  validate,
} from '../_lib/schemas.js';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']);
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
]);
const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

function routeSegments(req) {
  const pathname = new URL(req.url || '/api/admin', 'http://localhost').pathname.replace(/\/+$/, '');
  const prefix = '/api/admin/';
  if (!pathname.startsWith(prefix)) return [];
  return pathname
    .slice(prefix.length)
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
}

function routeNotFound(res) {
  return json(res, 404, { error: 'not_found' });
}

function parseId(raw, res) {
  const id = Number(raw);
  if (!Number.isInteger(id)) {
    badRequest(res, 'invalid_id');
    return null;
  }
  return id;
}

function queryValue(req, name) {
  const value = req.query?.[name];
  if (Array.isArray(value)) return value[0];
  if (value != null) return value;
  return new URL(req.url || '/api/admin', 'http://localhost').searchParams.get(name);
}

function detectMime(buffer) {
  if (buffer.length < 12) return null;
  const b = buffer;
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return 'image/gif';
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) return 'image/webp';
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
  const base = trimmed.split(/[\\/]/).pop();
  if (!base || base.startsWith('.') || base.includes('\0')) return null;
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, '_');
  if (cleaned.length === 0 || cleaned.length > 200) return null;
  const dot = cleaned.lastIndexOf('.');
  if (dot < 0) return null;
  const ext = cleaned.slice(dot + 1).toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) return null;
  return cleaned;
}

async function uploadImage(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  requireAdmin(req);

  const filename = safeFilename(queryValue(req, 'filename'));
  if (!filename) return badRequest(res, 'invalid_filename');

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    const e = new Error('BLOB_READ_WRITE_TOKEN not configured');
    e.status = 503;
    throw e;
  }

  const headerType = String(req.headers['content-type'] || '')
    .toLowerCase()
    .split(';')[0]
    .trim();
  const headerIsClaimedImage = headerType.startsWith('image/');
  if (headerIsClaimedImage && !ALLOWED_MIME.has(headerType)) {
    return badRequest(res, 'unsupported_content_type');
  }

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
  if (headerIsClaimedImage && headerType !== detected) {
    return badRequest(res, 'content_type_mismatch');
  }

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
}

async function handleProducts(req, res, sql, idPart) {
  if (!idPart) {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, slug, title, description, category, icon_name AS "iconName",
               image_url AS image, client, project_url AS "projectUrl",
               tech_stack AS "techStack", sort_order AS "sortOrder", published,
               updated_at AS "updatedAt"
        FROM products
        ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const b = validate(ProductCreate, body, res, badRequest);
      if (!b) return;
      const [row] = await sql`
        INSERT INTO products
          (slug, title, description, category, icon_name, image_url, client, project_url, tech_stack, sort_order, published)
        VALUES
          (${b.slug}, ${b.title}, ${b.description}, ${b.category},
           ${b.iconName ?? null}, ${b.image ?? null}, ${b.client}, ${b.projectUrl},
           ${JSON.stringify(b.techStack)}::jsonb, ${b.sortOrder},
           ${b.published})
        RETURNING id
      `;
      return json(res, 201, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  }

  const id = parseId(idPart, res);
  if (id == null) return;

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT id, slug, title, description, category, icon_name AS "iconName",
             image_url AS image, client, project_url AS "projectUrl",
             tech_stack AS "techStack", sort_order AS "sortOrder", published
      FROM products WHERE id = ${id}
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, row);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(ProductUpdate, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      UPDATE products SET
        slug        = COALESCE(${b.slug ?? null}, slug),
        title       = COALESCE(${b.title ?? null}, title),
        description = COALESCE(${b.description ?? null}, description),
        category    = COALESCE(${b.category ?? null}, category),
        icon_name   = COALESCE(${b.iconName ?? null}, icon_name),
        image_url   = COALESCE(${b.image ?? null}, image_url),
        client      = COALESCE(${b.client ?? null}, client),
        project_url = COALESCE(${b.projectUrl ?? null}, project_url),
        tech_stack  = COALESCE(${b.techStack ? JSON.stringify(b.techStack) : null}::jsonb, tech_stack),
        sort_order  = COALESCE(${b.sortOrder ?? null}, sort_order),
        published   = COALESCE(${b.published ?? null}, published),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING id
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, { id: row.id });
  }

  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
    if (result.length === 0) return routeNotFound(res);
    return json(res, 200, { ok: true });
  }

  return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
}

async function handleProjects(req, res, sql, idPart) {
  if (!idPart) {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, slug, title, description, client, project_url AS "projectUrl",
               image_url AS image, icon_name AS "iconName", tech_stack AS "techStack",
               status, sort_order AS "sortOrder", published, updated_at AS "updatedAt"
        FROM projects
        ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const b = validate(ProjectCreate, body, res, badRequest);
      if (!b) return;
      const [row] = await sql`
        INSERT INTO projects
          (slug, title, description, client, project_url, image_url, icon_name, tech_stack, status, sort_order, published)
        VALUES
          (${b.slug}, ${b.title}, ${b.description}, ${b.client}, ${b.projectUrl},
           ${b.image ?? null}, ${b.iconName ?? null},
           ${JSON.stringify(b.techStack)}::jsonb, ${b.status}, ${b.sortOrder},
           ${b.published})
        RETURNING id
      `;
      return json(res, 201, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  }

  const id = parseId(idPart, res);
  if (id == null) return;

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT id, slug, title, description, client, project_url AS "projectUrl",
             image_url AS image, icon_name AS "iconName", tech_stack AS "techStack",
             status, sort_order AS "sortOrder", published
      FROM projects WHERE id = ${id}
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, row);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(ProjectUpdate, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      UPDATE projects SET
        slug        = COALESCE(${b.slug ?? null}, slug),
        title       = COALESCE(${b.title ?? null}, title),
        description = COALESCE(${b.description ?? null}, description),
        client      = COALESCE(${b.client ?? null}, client),
        project_url = COALESCE(${b.projectUrl ?? null}, project_url),
        image_url   = COALESCE(${b.image ?? null}, image_url),
        icon_name   = COALESCE(${b.iconName ?? null}, icon_name),
        tech_stack  = COALESCE(${b.techStack ? JSON.stringify(b.techStack) : null}::jsonb, tech_stack),
        status      = COALESCE(${b.status ?? null}, status),
        sort_order  = COALESCE(${b.sortOrder ?? null}, sort_order),
        published   = COALESCE(${b.published ?? null}, published),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING id
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, { id: row.id });
  }

  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`;
    if (result.length === 0) return routeNotFound(res);
    return json(res, 200, { ok: true });
  }

  return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
}

async function handleServices(req, res, sql, idPart) {
  if (!idPart) {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, slug, title, description, icon_name AS "iconName",
               icon_image AS "iconImage", image_url AS image,
               color_class AS "colorClass", features, details,
               sort_order AS "sortOrder", published, updated_at AS "updatedAt"
        FROM services ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const b = validate(ServiceCreate, body, res, badRequest);
      if (!b) return;
      const [row] = await sql`
        INSERT INTO services
          (slug, title, description, icon_name, icon_image, image_url, color_class, features, details, sort_order, published)
        VALUES
          (${b.slug}, ${b.title}, ${b.description},
           ${b.iconName ?? null}, ${b.iconImage ?? null}, ${b.image ?? null},
           ${b.colorClass ?? null},
           ${JSON.stringify(b.features)}::jsonb,
           ${JSON.stringify(b.details)}::jsonb,
           ${b.sortOrder}, ${b.published})
        RETURNING id
      `;
      return json(res, 201, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  }

  const id = parseId(idPart, res);
  if (id == null) return;

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT id, slug, title, description, icon_name AS "iconName",
             icon_image AS "iconImage", image_url AS image,
             color_class AS "colorClass", features, details,
             sort_order AS "sortOrder", published
      FROM services WHERE id = ${id}
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, row);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(ServiceUpdate, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      UPDATE services SET
        slug        = COALESCE(${b.slug ?? null}, slug),
        title       = COALESCE(${b.title ?? null}, title),
        description = COALESCE(${b.description ?? null}, description),
        icon_name   = COALESCE(${b.iconName ?? null}, icon_name),
        icon_image  = COALESCE(${b.iconImage ?? null}, icon_image),
        image_url   = COALESCE(${b.image ?? null}, image_url),
        color_class = COALESCE(${b.colorClass ?? null}, color_class),
        features    = COALESCE(${b.features ? JSON.stringify(b.features) : null}::jsonb, features),
        details     = COALESCE(${b.details ? JSON.stringify(b.details) : null}::jsonb, details),
        sort_order  = COALESCE(${b.sortOrder ?? null}, sort_order),
        published   = COALESCE(${b.published ?? null}, published),
        updated_at  = now()
      WHERE id = ${id}
      RETURNING id
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, { id: row.id });
  }

  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM services WHERE id = ${id} RETURNING id`;
    if (result.length === 0) return routeNotFound(res);
    return json(res, 200, { ok: true });
  }

  return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
}

async function handleTeam(req, res, sql, idPart) {
  if (!idPart) {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, name, role, bio, image_url AS image,
               sort_order AS "sortOrder", published, updated_at AS "updatedAt"
        FROM team_members ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const b = validate(TeamCreate, body, res, badRequest);
      if (!b) return;
      const [row] = await sql`
        INSERT INTO team_members (name, role, bio, image_url, sort_order, published)
        VALUES (${b.name}, ${b.role}, ${b.bio}, ${b.image ?? null},
                ${b.sortOrder}, ${b.published})
        RETURNING id
      `;
      return json(res, 201, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  }

  const id = parseId(idPart, res);
  if (id == null) return;

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT id, name, role, bio, image_url AS image,
             sort_order AS "sortOrder", published
      FROM team_members WHERE id = ${id}
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, row);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(TeamUpdate, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      UPDATE team_members SET
        name       = COALESCE(${b.name ?? null}, name),
        role       = COALESCE(${b.role ?? null}, role),
        bio        = COALESCE(${b.bio ?? null}, bio),
        image_url  = COALESCE(${b.image ?? null}, image_url),
        sort_order = COALESCE(${b.sortOrder ?? null}, sort_order),
        published  = COALESCE(${b.published ?? null}, published),
        updated_at = now()
      WHERE id = ${id}
      RETURNING id
    `;
    if (!row) return routeNotFound(res);
    return json(res, 200, { id: row.id });
  }

  if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM team_members WHERE id = ${id} RETURNING id`;
    if (result.length === 0) return routeNotFound(res);
    return json(res, 200, { ok: true });
  }

  return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
}

async function handleAbout(req, res, sql, idPart) {
  if (idPart) return routeNotFound(res);

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT eyebrow, title_lead AS "titleLead", title_highlight AS "titleHighlight",
             description, image_url AS image,
             stat_badge_value AS "statBadgeValue",
             stat_badge_label AS "statBadgeLabel", stats
      FROM about_content WHERE id = 1
    `;
    return json(res, 200, row || null);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(AboutPatch, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      INSERT INTO about_content
        (id, eyebrow, title_lead, title_highlight, description, image_url, stat_badge_value, stat_badge_label, stats)
      VALUES
        (1, ${b.eyebrow}, ${b.titleLead}, ${b.titleHighlight},
         ${b.description}, ${b.image ?? null},
         ${b.statBadgeValue}, ${b.statBadgeLabel},
         ${JSON.stringify(b.stats)}::jsonb)
      ON CONFLICT (id) DO UPDATE SET
        eyebrow          = EXCLUDED.eyebrow,
        title_lead       = EXCLUDED.title_lead,
        title_highlight  = EXCLUDED.title_highlight,
        description      = EXCLUDED.description,
        image_url        = EXCLUDED.image_url,
        stat_badge_value = EXCLUDED.stat_badge_value,
        stat_badge_label = EXCLUDED.stat_badge_label,
        stats            = EXCLUDED.stats,
        updated_at       = now()
      RETURNING id
    `;
    return json(res, 200, { id: row.id });
  }

  return methodNotAllowed(res, ['GET', 'PATCH']);
}

async function handleContact(req, res, sql, idPart) {
  if (idPart) return routeNotFound(res);

  if (req.method === 'GET') {
    const [row] = await sql`
      SELECT email, phone, address,
             whatsapp_number AS "whatsappNumber",
             web3forms_access_key AS "web3formsAccessKey"
      FROM contact_info WHERE id = 1
    `;
    return json(res, 200, row || null);
  }

  if (req.method === 'PATCH') {
    const body = await readJson(req);
    const b = validate(ContactPatch, body, res, badRequest);
    if (!b) return;
    const [row] = await sql`
      INSERT INTO contact_info
        (id, email, phone, address, whatsapp_number, web3forms_access_key)
      VALUES
        (1, ${b.email}, ${b.phone}, ${b.address},
         ${b.whatsappNumber}, ${b.web3formsAccessKey})
      ON CONFLICT (id) DO UPDATE SET
        email                = EXCLUDED.email,
        phone                = EXCLUDED.phone,
        address              = EXCLUDED.address,
        whatsapp_number      = EXCLUDED.whatsapp_number,
        web3forms_access_key = EXCLUDED.web3forms_access_key,
        updated_at           = now()
      RETURNING id
    `;
    return json(res, 200, { id: row.id });
  }

  return methodNotAllowed(res, ['GET', 'PATCH']);
}

export default async function handler(req, res) {
  try {
    const [resource, idPart, ...extra] = routeSegments(req);
    if (!resource || extra.length > 0) return routeNotFound(res);

    if (resource === 'upload') return await uploadImage(req, res);

    requireAdmin(req);
    const sql = db();
    noCache(res);

    if (resource === 'products') return await handleProducts(req, res, sql, idPart);
    if (resource === 'projects') return await handleProjects(req, res, sql, idPart);
    if (resource === 'services') return await handleServices(req, res, sql, idPart);
    if (resource === 'team') return await handleTeam(req, res, sql, idPart);
    if (resource === 'about') return await handleAbout(req, res, sql, idPart);
    if (resource === 'contact') return await handleContact(req, res, sql, idPart);

    return routeNotFound(res);
  } catch (err) {
    serverError(res, err);
  }
}
