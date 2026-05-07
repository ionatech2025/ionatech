import { db } from '../_lib/db.js';
import { json, methodNotAllowed, badRequest, serverError, tooManyRequests } from '../_lib/respond.js';
import { verifyPassword, signToken, setAuthCookie, readJson } from '../_lib/auth.js';
import { rateLimit } from '../_lib/rate-limit.js';

// Two-tier rate limit (fixed-window counters; see api/_lib/rate-limit.js):
// a per-IP burst cap (cheap defence against drive-by scanners) and a slower
// per-(IP, email) cap so a single user doesn't lock themselves out from a
// typo while still blocking targeted brute force.
const BURST = { limit: 20, windowMs: 60_000 };
const PER_EMAIL = { limit: 5, windowMs: 15 * 60_000 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  try {
    const burst = rateLimit({ key: 'login:burst', req, ...BURST });
    if (!burst.allowed) return tooManyRequests(res, burst.retryAfterSeconds);

    const body = await readJson(req);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) return badRequest(res, 'email_password_required');

    const perEmail = rateLimit({ key: `login:email:${email}`, req, ...PER_EMAIL });
    if (!perEmail.allowed) return tooManyRequests(res, perEmail.retryAfterSeconds);

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
