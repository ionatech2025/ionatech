import { useEffect, useState } from 'react';

/**
 * Fetch a public content resource. Returns parsed JSON on 2xx, throws otherwise.
 */
export async function getContent(resource, signal) {
  const r = await fetch(`/api/content/${resource}`, { signal });
  if (!r.ok) throw new Error(`/api/content/${resource} returned ${r.status}`);
  return r.json();
}

/**
 * Hook: read a content resource with a guaranteed-immediate fallback.
 *
 * The fallback (typically the bundled /src/data/* literal) renders instantly
 * on first paint. The API result, if it succeeds, replaces the fallback. If
 * the API errors (e.g. DATABASE_URL not set yet, network down, deploy in
 * progress), the fallback stays — the site never breaks.
 */
export function useContent(resource, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    const ctrl = new AbortController();
    getContent(resource, ctrl.signal)
      .then((live) => {
        if (live == null) return;
        if (Array.isArray(live) && live.length === 0) return;
        setData(live);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn(`[content] using fallback for ${resource}:`, err.message);
        }
      });
    return () => ctrl.abort();
  }, [resource]);

  return data;
}

/**
 * Authenticated fetch for the admin app. Sends the iona_admin cookie via
 * `credentials: 'include'`. Throws on non-2xx with the response body parsed
 * as `.body`.
 */
export async function adminFetch(path, opts = {}) {
  const r = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const text = await r.text();
  const body = text ? JSON.parse(text) : null;
  if (!r.ok) {
    const e = new Error(body?.error || `${path} ${r.status}`);
    e.status = r.status;
    e.body = body;
    throw e;
  }
  return body;
}
