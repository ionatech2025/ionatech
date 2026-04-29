import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  try {
    const sql = db();
    const rows = await sql`
      SELECT id, name, role, bio, image_url AS image,
             sort_order AS "sortOrder", published
      FROM team_members
      WHERE published = true
      ORDER BY sort_order ASC, id ASC
    `;
    publicCache(res);
    json(res, 200, rows);
  } catch (err) {
    serverError(res, err);
  }
}
