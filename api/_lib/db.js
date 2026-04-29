import { neon } from '@neondatabase/serverless';

let _sql = null;

/**
 * Lazy Neon client. Throws a clear error at request time if DATABASE_URL is
 * missing instead of crashing at import. Public content endpoints use this and
 * surface 503 to the frontend, which falls back to bundled data.
 */
export function db() {
  if (_sql) return _sql;
  if (!process.env.DATABASE_URL) {
    const e = new Error('DATABASE_URL is not configured');
    e.status = 503;
    throw e;
  }
  _sql = neon(process.env.DATABASE_URL);
  return _sql;
}
