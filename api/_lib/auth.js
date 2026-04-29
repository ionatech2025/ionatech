import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const COOKIE_NAME = 'iona_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const e = new Error('JWT_SECRET is not configured');
    e.status = 503;
    throw e;
  }
  return secret;
}

export const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);
export const hashPassword = (plain) => bcrypt.hash(plain, 12);

export function signToken(user) {
  return jwt.sign(
    { uid: user.id, email: user.email },
    getSecret(),
    { expiresIn: '7d' }
  );
}

export function readCookie(req, name = COOKIE_NAME) {
  const header = req.headers?.cookie || '';
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

/**
 * Verify the auth cookie and return the JWT payload. Throws an Error with
 * `.status = 401` when the cookie is missing or invalid — admin handlers
 * should catch and respond.
 */
export function requireAdmin(req) {
  const token = readCookie(req);
  if (!token) {
    const e = new Error('unauthorized');
    e.status = 401;
    throw e;
  }
  try {
    return jwt.verify(token, getSecret());
  } catch {
    const e = new Error('unauthorized');
    e.status = 401;
    throw e;
  }
}

// Browsers refuse Secure cookies over plain HTTP. Vercel deployments are
// always HTTPS, but `vercel dev` / our Vite dev plugin run on http://localhost —
// so flip Secure off in development to keep login working locally without
// weakening production.
const isProd = () =>
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

const cookieFlags = () => {
  const flags = ['HttpOnly', 'SameSite=Lax', 'Path=/'];
  if (isProd()) flags.splice(1, 0, 'Secure');
  return flags;
};

export function setAuthCookie(res, token) {
  const parts = [`${COOKIE_NAME}=${token}`, ...cookieFlags(), `Max-Age=${MAX_AGE_SECONDS}`];
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearAuthCookie(res) {
  const parts = [`${COOKIE_NAME}=`, ...cookieFlags(), 'Max-Age=0'];
  res.setHeader('Set-Cookie', parts.join('; '));
}

/**
 * Read and parse the JSON body of an incoming Vercel Function request.
 * Returns {} if the body is empty.
 */
export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) return JSON.parse(req.body);
  return await new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', (chunk) => (buf += chunk));
    req.on('end', () => {
      if (!buf) return resolve({});
      try { resolve(JSON.parse(buf)); } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}
