import { db } from '../../_lib/db.js';
import { json, noCache, methodNotAllowed, badRequest, serverError } from '../../_lib/respond.js';
import { requireAdmin, readJson } from '../../_lib/auth.js';
import { TeamUpdate, validate } from '../../_lib/schemas.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);
    const id = Number(req.query?.id);
    if (!Number.isInteger(id)) return badRequest(res, 'invalid_id');

    if (req.method === 'GET') {
      const [row] = await sql`
        SELECT id, name, role, bio, image_url AS image,
               sort_order AS "sortOrder", published
        FROM team_members WHERE id = ${id}
      `;
      if (!row) return json(res, 404, { error: 'not_found' });
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
      if (!row) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { id: row.id });
    }

    if (req.method === 'DELETE') {
      const result = await sql`DELETE FROM team_members WHERE id = ${id} RETURNING id`;
      if (result.length === 0) return json(res, 404, { error: 'not_found' });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (err) {
    serverError(res, err);
  }
}
