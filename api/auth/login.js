import { db } from '../_lib/db.js';
import { json, methodNotAllowed, badRequest, serverError } from '../_lib/respond.js';
import { verifyPassword, signToken, setAuthCookie, readJson } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  try {
    const body = await readJson(req);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) return badRequest(res, 'email_password_required');

    const sql = db();
    const [user] = await sql`
      SELECT id, email, password_hash FROM admin_users WHERE email = ${email}
    `;
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return json(res, 401, { error: 'invalid_credentials' });
    }

    const token = signToken(user);
    setAuthCookie(res, token);
    json(res, 200, { user: { id: user.id, email: user.email } });
  } catch (err) {
    serverError(res, err);
  }
}
