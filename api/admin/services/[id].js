import { db } from '../../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../../_lib/respond.js';
import { requireAdmin, readJson } from '../../_lib/auth.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);
    const id = Number(req.query?.id);
    if (!Number.isInteger(id)) return badRequest(res, 'invalid_id');

    if (req.method === 'GET') {
      const [row] = await sql`
        SELECT id, slug, title, description, icon_name AS "iconName",
               icon_image AS "iconImage", image_url AS image,
               color_class AS "colorClass", features, details,
               sort_order AS "sortOrder", published
        FROM services WHERE id = ${id}
      `;
      if (!row) return json(res, 404, { error: 'not_found' });
      return json(res, 200, row);
    }

    if (req.method === 'PATCH') {
      const b = await readJson(req);
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
      if (!row) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { id: row.id });
    }

    if (req.method === 'DELETE') {
      const result = await sql`DELETE FROM services WHERE id = ${id} RETURNING id`;
      if (result.length === 0) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (err) {
    serverError(res, err);
  }
}
