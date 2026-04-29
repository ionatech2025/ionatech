import { db } from '../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin, readJson } from '../_lib/auth.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);

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
      const b = await readJson(req);
      if (!b.slug || !b.title) return badRequest(res, 'slug_and_title_required');
      const [row] = await sql`
        INSERT INTO services
          (slug, title, description, icon_name, icon_image, image_url, color_class, features, details, sort_order, published)
        VALUES
          (${b.slug}, ${b.title}, ${b.description ?? ''},
           ${b.iconName ?? null}, ${b.iconImage ?? null}, ${b.image ?? null},
           ${b.colorClass ?? null},
           ${JSON.stringify(b.features ?? [])}::jsonb,
           ${JSON.stringify(b.details ?? {})}::jsonb,
           ${b.sortOrder ?? 0}, ${b.published ?? true})
        RETURNING id
      `;
      return json(res, 201, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    serverError(res, err);
  }
}
