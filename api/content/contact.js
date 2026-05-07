import { db } from '../_lib/db.js';
import { json, publicCache, methodNotAllowed, serverError } from '../_lib/respond.js';

// Note: web3forms_access_key is intentionally NOT returned here. Today the
// frontend still submits the contact form directly to Web3Forms, and the
// bundled src/data/contact.js continues to ship the key to the browser for
// parity with the current site. A future change can move that submit into
// an /api/contact handler so the key stays server-side.

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
