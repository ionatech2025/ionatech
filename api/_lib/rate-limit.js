/**
 * Tiny in-memory fixed-window counter keyed by IP+identifier (e.g.
 * "ip|email"). Each bucket counts requests in a `windowMs` window that
 * resets when the next request arrives after the window has elapsed.
 *
 * Caveats:
 *   - Per-instance only. Vercel Functions reuse instances under Fluid Compute,
 *     but a burst spread across regions would not share state. For an MVP /admin
 *     this is enough; promote to Upstash/Edge Config if abuse is observed.
 *   - Memory grows with unique keys; we evict entries that have not been seen
 *     within the window so the table cannot grow unbounded.
 *   - Fixed windows allow a boundary burst (up to 2× `limit` in 2× `windowMs`).
 *     For a login endpoint with bcrypt this is acceptable; swap in a sliding
 *     window if tighter accounting is needed.
 */

const buckets = new Map();

function clientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Check + increment the bucket. Returns { allowed, retryAfterSeconds }.
 * When `allowed` is false, callers should respond with HTTP 429.
 *
 * @param {object} opts
 * @param {string} opts.key - identifier; combined with the IP automatically
 * @param {number} opts.limit - max attempts in `windowMs`
 * @param {number} opts.windowMs - rolling window length
 * @param {object} opts.req - incoming request (for IP)
 */
export function rateLimit({ key, limit, windowMs, req }) {
  const now = Date.now();
  const ip = clientIp(req);
  const id = `${ip}|${key}`;

  // Evict stale entries opportunistically (~1 per call) to bound memory.
  if (buckets.size > 0 && Math.random() < 0.05) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
    }
  }

  let bucket = buckets.get(id);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(id, bucket);
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test helper — clears all buckets. */
export function _resetRateLimitForTests() {
  buckets.clear();
}
