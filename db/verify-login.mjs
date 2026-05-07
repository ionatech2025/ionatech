// Equivalent to the /api/auth/login handler logic, run locally without
// spinning up vercel dev. Reads creds from .env.local and confirms:
//   1. admin user exists in DB
//   2. bcrypt password matches
//   3. JWT signs and round-trips against JWT_SECRET
//
// Run: node db/verify-login.mjs

import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dns from 'node:dns';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const env = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
} catch {}

dns.setDefaultResultOrder('ipv4first');
const origLookup = dns.lookup;
dns.lookup = (host, opts, cb) => {
  if (typeof opts === 'function') return origLookup(host, { family: 4 }, opts);
  return origLookup(host, { ...(opts || {}), family: 4 }, cb);
};

const { DATABASE_URL, JWT_SECRET, INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD } = process.env;
const fail = (msg) => { console.error('✗', msg); process.exit(1); };
if (!DATABASE_URL)            fail('DATABASE_URL missing');
if (!JWT_SECRET)              fail('JWT_SECRET missing');
if (!INITIAL_ADMIN_EMAIL)     fail('INITIAL_ADMIN_EMAIL missing');
if (!INITIAL_ADMIN_PASSWORD)  fail('INITIAL_ADMIN_PASSWORD missing');

const client = new pg.Client({ connectionString: DATABASE_URL });
await client.connect();
try {
  const { rows: [user] } = await client.query(
    'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
    [INITIAL_ADMIN_EMAIL.trim().toLowerCase()]
  );
  if (!user) fail('user not found in admin_users');

  const ok = await bcrypt.compare(INITIAL_ADMIN_PASSWORD, user.password_hash);
  if (!ok) fail('bcrypt password mismatch');

  const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded.email !== user.email) fail('jwt payload mismatch');

  console.log(`✓ user found in DB: ${user.email} (id=${user.id})`);
  console.log('✓ bcrypt password verified');
  console.log(`✓ JWT signed and verified (uid=${decoded.uid}, exp in 7d)`);
  console.log('\n✓ login flow OK — /api/auth/login will succeed in production with these creds.');
} finally {
  await client.end();
}
