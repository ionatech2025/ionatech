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
        SELECT id, name, role, bio, image_url AS image,
               sort_order AS "sortOrder", published, updated_at AS "updatedAt"
        FROM team_members ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (req.method === 'POST') {
      const b = await readJson(req);
      if (!b.name) return badRequest(res, 'name_required');
      const [row] = await sql`
        INSERT INTO team_members (name, role, bio, image_url, sort_order, published)
        VALUES (${b.name}, ${b.role ?? ''}, ${b.bio ?? ''}, ${b.image ?? null},
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
