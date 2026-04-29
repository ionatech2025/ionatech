import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

// Note: web3forms_access_key is intentionally NOT returned. The frontend
// posts to /api/contact (TODO: future) which will read it server-side.
// For now the existing src/data/contact.js still ships the key to the
// browser as it does in Phase 1 — that's parity with the current site.

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  try {
    const sql = db();
    const [row] = await sql`
      SELECT email, phone, address, whatsapp_number AS "whatsappNumber"
      FROM contact_info
      WHERE id = 1
    `;
    publicCache(res);
    json(res, 200, row || null);
  } catch (err) {
    serverError(res, err);
  }
}
