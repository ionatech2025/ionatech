import { db } from '../_lib/db.js';
import { json, methodNotAllowed, badRequest, serverError, tooManyRequests } from '../_lib/respond.js';
import { verifyPassword, signToken, setAuthCookie, clearAuthCookie, requireAdmin, readJson } from '../_lib/auth.js';
import { rateLimit } from '../_lib/rate-limit.js';

const BURST = { limit: 20, windowMs: 60_000 };
const PER_EMAIL = { limit: 5, windowMs: 15 * 60_000 };

function actionName(req) {
  const fromQuery = req.query?.action;
  if (Array.isArray(fromQuery)) return fromQuery[0];
  if (fromQuery) return fromQuery;

  const pathname = new URL(req.url || '/api/auth', 'http://localhost').pathname.replace(/\/+$/, '');
  const prefix = '/api/auth/';
  return pathname.startsWith(prefix) ? decodeURIComponent(pathname.slice(prefix.length)) : '';
}

function routeNotFound(res) {
  return json(res, 404, { error: 'not_found' });
}

async function login(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

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
  return json(res, 200, { user: { id: user.id, email: user.email } });
}

function logout(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  clearAuthCookie(res);
  return json(res, 200, { ok: true });
}

function me(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  const user = requireAdmin(req);
  return json(res, 200, { user: { id: user.uid, email: user.email } });
}

export default async function handler(req, res) {
  try {
    const action = actionName(req);
    if (action === 'login') return await login(req, res);
    if (action === 'logout') return logout(req, res);
    if (action === 'me') return me(req, res);
    return routeNotFound(res);
  } catch (err) {
    serverError(res, err);
  }
}
