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
        SELECT id, slug, title, description, category, icon_name AS "iconName",
               image_url AS image, client, project_url AS "projectUrl",
               tech_stack AS "techStack", sort_order AS "sortOrder", published
        FROM products WHERE id = ${id}
      `;
      if (!row) return json(res, 404, { error: 'not_found' });
      return json(res, 200, row);
    }

    if (req.method === 'PATCH') {
      const b = await readJson(req);
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
      if (!row) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { id: row.id });
    }

    if (req.method === 'DELETE') {
      const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
      if (result.length === 0) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (err) {
    serverError(res, err);
  }
}
