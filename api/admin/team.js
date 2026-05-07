import { db } from '../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { requireAdmin, readJson } from '../_lib/auth.js';
import { TeamCreate, validate } from '../_lib/schemas.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);

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
  } catch (err) {
    serverError(res, err);
  }
}
