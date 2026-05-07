import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

function resourceName(req) {
  const fromQuery = req.query?.resource;
  if (Array.isArray(fromQuery)) return fromQuery[0];
  if (fromQuery) return fromQuery;

  const pathname = new URL(req.url || '/api/content', 'http://localhost').pathname.replace(/\/+$/, '');
  const prefix = '/api/content/';
  return pathname.startsWith(prefix) ? decodeURIComponent(pathname.slice(prefix.length)) : '';
}

function routeNotFound(res) {
  return json(res, 404, { error: 'not_found' });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  try {
    const resource = resourceName(req);
    const sql = db();
    publicCache(res);

    if (resource === 'about') {
      const [row] = await sql`
        SELECT eyebrow, title_lead AS "titleLead", title_highlight AS "titleHighlight",
               description, image_url AS image,
               stat_badge_value AS "statBadgeValue",
               stat_badge_label AS "statBadgeLabel", stats
        FROM about_content
        WHERE id = 1
      `;
      return json(res, 200, row || null);
    }

    if (resource === 'contact') {
      const [row] = await sql`
        SELECT email, phone, address, whatsapp_number AS "whatsappNumber"
        FROM contact_info
        WHERE id = 1
      `;
      return json(res, 200, row || null);
    }

    if (resource === 'products') {
      const rows = await sql`
        SELECT id, slug, title, description, category, icon_name AS "iconName",
               image_url AS image, client, project_url AS "projectUrl",
               tech_stack AS "techStack", sort_order AS "sortOrder", published
        FROM products
        WHERE published = true
        ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (resource === 'services') {
      const rows = await sql`
        SELECT id, slug, title, description, icon_name AS "iconName",
               icon_image AS "iconImage", image_url AS image,
               color_class AS "colorClass", features, details,
               sort_order AS "sortOrder", published
        FROM services
        WHERE published = true
        ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    if (resource === 'team') {
      const rows = await sql`
        SELECT id, name, role, bio, image_url AS image,
               sort_order AS "sortOrder", published
        FROM team_members
        WHERE published = true
        ORDER BY sort_order ASC, id ASC
      `;
      return json(res, 200, rows);
    }

    return routeNotFound(res);
  } catch (err) {
    serverError(res, err);
  }
}
