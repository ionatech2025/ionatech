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
 * as `.body` when JSON, or as a string fallback otherwise (handy when an
 * upstream proxy returns an HTML 502).
 */
export async function adminFetch(path, opts = {}) {
  const r = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const text = await r.text();
  let body = null;
  if (text) {
    try { body = JSON.parse(text); }
    catch { body = text; }
  }
  if (!r.ok) {
    const message = (body && typeof body === 'object' && body.error) || (typeof body === 'string' && body) || `${path} ${r.status}`;
    const e = new Error(message);
    e.status = r.status;
    e.body = body;
    throw e;
  }
  return body;
}

/**
 * Merge live rows (from the API) with bundled fallback rows (from src/data).
 * Live values win, but null/undefined fields fall through to the matching
 * fallback row by `slug`. Rows that exist only in live are kept as-is. This
 * preserves bundled images during rollout (DB seed leaves image_url NULL).
 */
export function mergeBySlug(live, fallback) {
  if (!Array.isArray(live)) return fallback;
  const fallbackBySlug = new Map((fallback || []).map((r) => [r.slug, r]));
  return live.map((row) => {
    const fb = fallbackBySlug.get(row.slug);
    if (!fb) return row;
    const merged = { ...fb };
    for (const [k, v] of Object.entries(row)) {
      if (v != null) merged[k] = v;
    }
    return merged;
  });
}

/** Same idea, for singletons (about, contact). */
export function mergeSingleton(live, fallback) {
  if (!live) return fallback;
  const merged = { ...fallback };
  for (const [k, v] of Object.entries(live)) {
    if (v != null) merged[k] = v;
  }
  return merged;
}
