import { db } from '../_lib/db.js';
import { json, noCache, methodNotAllowed, serverError } from '../_lib/respond.js';
import { requireAdmin, readJson } from '../_lib/auth.js';

export default async function handler(req, res) {
  try {
    requireAdmin(req);
    const sql = db();
    noCache(res);

    if (req.method === 'GET') {
      const [row] = await sql`
        SELECT eyebrow, title_lead AS "titleLead", title_highlight AS "titleHighlight",
               description, image_url AS image,
               stat_badge_value AS "statBadgeValue",
               stat_badge_label AS "statBadgeLabel", stats
        FROM about_content WHERE id = 1
      `;
      return json(res, 200, row || null);
    }

    if (req.method === 'PATCH') {
      const b = await readJson(req);
      // Upsert (id is forced to 1 by CHECK constraint).
      const [row] = await sql`
        INSERT INTO about_content
          (id, eyebrow, title_lead, title_highlight, description, image_url, stat_badge_value, stat_badge_label, stats)
        VALUES
          (1, ${b.eyebrow ?? ''}, ${b.titleLead ?? ''}, ${b.titleHighlight ?? ''},
           ${b.description ?? ''}, ${b.image ?? null},
           ${b.statBadgeValue ?? ''}, ${b.statBadgeLabel ?? ''},
           ${JSON.stringify(b.stats ?? [])}::jsonb)
        ON CONFLICT (id) DO UPDATE SET
          eyebrow          = EXCLUDED.eyebrow,
          title_lead       = EXCLUDED.title_lead,
          title_highlight  = EXCLUDED.title_highlight,
          description      = EXCLUDED.description,
          image_url        = EXCLUDED.image_url,
          stat_badge_value = EXCLUDED.stat_badge_value,
          stat_badge_label = EXCLUDED.stat_badge_label,
          stats            = EXCLUDED.stats,
          updated_at       = now()
        RETURNING id
      `;
      return json(res, 200, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'PATCH']);
  } catch (err) {
    serverError(res, err);
  }
}
