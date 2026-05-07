/**
 * Tiny response helpers used by every API route. Vercel Functions in this
 * project use the Node-style (req, res) signature, so we wrap the boilerplate.
 */

export function json(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

export function publicCache(res) {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
}

export function noCache(res) {
  res.setHeader('Cache-Control', 'no-store');
}

export function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  json(res, 405, { error: 'method_not_allowed' });
}

export function badRequest(res, message = 'bad_request') {
  json(res, 400, { error: message });
}

export function tooManyRequests(res, retryAfterSeconds = 60) {
  res.setHeader('Retry-After', String(retryAfterSeconds));
  json(res, 429, { error: 'too_many_requests', retryAfterSeconds });
}

export function serverError(res, err) {
  const status = err?.status || 500;
  // Don't leak internal error messages to the client.
  console.error('[api]', err);
  json(res, status, { error: status === 503 ? 'service_unavailable' : 'server_error' });
}
