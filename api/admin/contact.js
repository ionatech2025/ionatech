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
        SELECT email, phone, address,
               whatsapp_number AS "whatsappNumber",
               web3forms_access_key AS "web3formsAccessKey"
        FROM contact_info WHERE id = 1
      `;
      return json(res, 200, row || null);
    }

    if (req.method === 'PATCH') {
      const b = await readJson(req);
      const [row] = await sql`
        INSERT INTO contact_info
          (id, email, phone, address, whatsapp_number, web3forms_access_key)
        VALUES
          (1, ${b.email ?? ''}, ${b.phone ?? ''}, ${b.address ?? ''},
           ${b.whatsappNumber ?? ''}, ${b.web3formsAccessKey ?? ''})
        ON CONFLICT (id) DO UPDATE SET
          email                = EXCLUDED.email,
          phone                = EXCLUDED.phone,
          address              = EXCLUDED.address,
          whatsapp_number      = EXCLUDED.whatsapp_number,
          web3forms_access_key = EXCLUDED.web3forms_access_key,
          updated_at           = now()
        RETURNING id
      `;
      return json(res, 200, { id: row.id });
    }

    return methodNotAllowed(res, ['GET', 'PATCH']);
  } catch (err) {
    serverError(res, err);
  }
}
