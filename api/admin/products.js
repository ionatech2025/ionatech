import { db } from '../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin, readJson } from '../_lib/auth.js';
import { ProductCreate, validate } from '../_lib/schemas.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);

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
  } catch (err) {
    serverError(res, err);
  }
}
