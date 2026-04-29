import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  try {
    const sql = db();
    const rows = await sql`
      SELECT id, slug, title, description, category, icon_name AS "iconName",
             image_url AS image, client, project_url AS "projectUrl",
             tech_stack AS "techStack", sort_order AS "sortOrder", published
      FROM products
      WHERE published = true
      ORDER BY sort_order ASC, id ASC
    `;
    publicCache(res);
    json(res, 200, rows);
  } catch (err) {
    serverError(res, err);
  }
}
