import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  try {
    const sql = db();
    const [row] = await sql`
      SELECT eyebrow, title_lead AS "titleLead", title_highlight AS "titleHighlight",
             description, image_url AS image,
             stat_badge_value AS "statBadgeValue",
             stat_badge_label AS "statBadgeLabel", stats
      FROM about_content
      WHERE id = 1
    `;
    publicCache(res);
    json(res, 200, row || null);
  } catch (err) {
    serverError(res, err);
  }
}
