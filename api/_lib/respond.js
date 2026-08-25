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
  console.error('[api]', err);
  // 4xx errors thrown with a .status (e.g. requireAdmin's 401 'unauthorized'
  // / 'session_revoked') are intentional, developer-authored messages safe
  // to show as-is — collapsing them to 'server_error' just made every
  // authorization failure indistinguishable from a real crash. 5xx stays
  // generic: those come from unexpected exceptions (DB errors, etc.) that
  // can carry internals in err.message.
  if (status >= 400 && status < 500) {
    return json(res, status, { error: err.message || 'client_error' });
  }
  json(res, status, { error: status === 503 ? 'service_unavailable' : 'server_error' });
}
