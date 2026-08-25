import crypto from 'node:crypto';
import { db } from '../_lib/db.js';
import { json, methodNotAllowed, badRequest, serverError, tooManyRequests } from '../_lib/respond.js';
import {
  verifyPassword,
  hashPassword,
  signToken,
  setAuthCookie,
  clearAuthCookie,
  requireAdmin,
  readJson,
} from '../_lib/auth.js';
import { rateLimit } from '../_lib/rate-limit.js';
import { ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, validate } from '../_lib/schemas.js';
import { sendPasswordResetEmail } from '../_lib/email.js';
import { absoluteUrl } from '../../src/data/seo.js';

const BURST = { limit: 20, windowMs: 60_000 };
const PER_EMAIL = { limit: 5, windowMs: 15 * 60_000 };
const FORGOT_PASSWORD_PER_EMAIL = { limit: 3, windowMs: 15 * 60_000 };
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

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

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
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
    SELECT id, email, password_hash, token_version AS "tokenVersion" FROM admin_users WHERE email = ${email}
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

async function me(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  const user = await requireAdmin(req, db());
  return json(res, 200, { user: { id: user.uid, email: user.email } });
}

/**
 * Always responds 200 { ok: true } whether or not the email belongs to an
 * account — an account-enumeration-resistant pattern (OWASP Forgot
 * Password Cheat Sheet). Only sends an email, and only does the DB write,
 * when it actually does.
 */
async function forgotPassword(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const burst = rateLimit({ key: 'forgot-password:burst', req, ...BURST });
  if (!burst.allowed) return tooManyRequests(res, burst.retryAfterSeconds);

  const body = await readJson(req);
  const parsed = validate(ForgotPasswordRequest, body, res, badRequest);
  if (!parsed) return;
  const { email } = parsed;

  const perEmail = rateLimit({ key: `forgot-password:email:${email}`, req, ...FORGOT_PASSWORD_PER_EMAIL });
  if (!perEmail.allowed) return tooManyRequests(res, perEmail.retryAfterSeconds);

  const sql = db();
  const [user] = await sql`SELECT id FROM admin_users WHERE email = ${email}`;

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await sql`
      INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
      VALUES (${user.id}, ${hashToken(rawToken)}, ${expiresAt.toISOString()})
    `;
    const resetUrl = `${absoluteUrl('/admin/reset-password')}?token=${rawToken}`;
    await sendPasswordResetEmail({ to: email, resetUrl });
  }

  return json(res, 200, { ok: true });
}

async function resetPassword(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const burst = rateLimit({ key: 'reset-password:burst', req, ...BURST });
  if (!burst.allowed) return tooManyRequests(res, burst.retryAfterSeconds);

  const body = await readJson(req);
  const parsed = validate(ResetPasswordRequest, body, res, badRequest);
  if (!parsed) return;
  const { token, password } = parsed;

  const sql = db();
  const [row] = await sql`
    SELECT id, user_id AS "userId" FROM password_reset_tokens
    WHERE token_hash = ${hashToken(token)} AND used_at IS NULL AND expires_at > now()
  `;
  if (!row) return json(res, 400, { error: 'invalid_or_expired_token' });

  const passwordHash = await hashPassword(password);
  await sql`
    UPDATE admin_users
    SET password_hash = ${passwordHash}, token_version = token_version + 1
    WHERE id = ${row.userId}
  `;
  // Burn every outstanding token for this user, not just the one that was
  // clicked — a successful reset should retire every link ever emailed.
  await sql`
    UPDATE password_reset_tokens SET used_at = now()
    WHERE user_id = ${row.userId} AND used_at IS NULL
  `;

  return json(res, 200, { ok: true });
}

/** Requires an existing session. Re-issues a fresh cookie afterward so the
 * browser making the change stays logged in even though the token_version
 * bump would otherwise invalidate its own current token too. */
async function changePassword(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const sql = db();
  const auth = await requireAdmin(req, sql);

  const body = await readJson(req);
  const parsed = validate(ChangePasswordRequest, body, res, badRequest);
  if (!parsed) return;
  const { currentPassword, newPassword } = parsed;

  const [user] = await sql`SELECT id, email, password_hash FROM admin_users WHERE id = ${auth.uid}`;
  if (!user || !(await verifyPassword(currentPassword, user.password_hash))) {
    return json(res, 401, { error: 'invalid_current_password' });
  }

  const passwordHash = await hashPassword(newPassword);
  const [updated] = await sql`
    UPDATE admin_users
    SET password_hash = ${passwordHash}, token_version = token_version + 1
    WHERE id = ${user.id}
    RETURNING token_version AS "tokenVersion"
  `;

  const token = signToken({ id: user.id, email: user.email, tokenVersion: updated.tokenVersion });
  setAuthCookie(res, token);
  return json(res, 200, { ok: true });
}

export default async function handler(req, res) {
  try {
    const action = actionName(req);
    if (action === 'login') return await login(req, res);
    if (action === 'logout') return logout(req, res);
    if (action === 'me') return await me(req, res);
    if (action === 'forgot-password') return await forgotPassword(req, res);
    if (action === 'reset-password') return await resetPassword(req, res);
    if (action === 'change-password') return await changePassword(req, res);
    return routeNotFound(res);
  } catch (err) {
    serverError(res, err);
  }
}
