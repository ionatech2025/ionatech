// Vite middleware that mounts /api/* by dynamically loading the matching
// file under ./api at request time. Mirrors the routing convention used by
// Vercel Functions for non-Next.js projects (default export, (req,res)).
//
// Lets us run the full app — including auth + DB — under `npm run dev`
// without needing `vercel link` / `vercel dev`.

import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import dns from 'node:dns';
import { parse as parseUrl } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const API_ROOT = resolve(__dirname, 'api');

// Force IPv4 — same reason as db/seed.mjs: this host can't reach Neon over
// IPv6.
dns.setDefaultResultOrder('ipv4first');
const _origLookup = dns.lookup;
dns.lookup = (host, opts, cb) => {
  if (typeof opts === 'function') return _origLookup(host, { family: 4 }, opts);
  return _origLookup(host, { ...(opts || {}), family: 4 }, cb);
};

// Load .env.local into process.env (no dotenv dep).
function loadEnv() {
  const file = join(__dirname, '.env.local');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}

/**
 * Map "/api/admin/products/123" to a handler file path:
 *   1. api/admin/products/123.js     (literal)
 *   2. api/admin/products/[id].js    (dynamic, sets params.id = '123')
 *   3. api/admin/products.js         (catches /api/admin/products itself)
 *
 * Returns { file, params } or null if no handler exists.
 */
function resolveHandler(pathname) {
  const rel = pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');
  if (!rel) return null;
  const segments = rel.split('/');

  // Exact file match.
  const literal = join(API_ROOT, ...segments) + '.js';
  if (existsSync(literal) && statSync(literal).isFile()) {
    return { file: literal, params: {} };
  }

  // Dynamic [param].js in the parent directory.
  if (segments.length >= 2) {
    const parentDir = join(API_ROOT, ...segments.slice(0, -1));
    if (existsSync(parentDir)) {
      const entries = readdirSync(parentDir);
      const dynamic = entries.find((e) => /^\[[^\]]+\]\.js$/.test(e));
      if (dynamic) {
        const paramName = dynamic.match(/^\[([^\]]+)\]\.js$/)[1];
        return {
          file: join(parentDir, dynamic),
          params: { [paramName]: segments[segments.length - 1] },
        };
      }
    }
  }
  return null;
}

async function readBody(req) {
  return await new Promise((resolveBody, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolveBody(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default function devApiPlugin() {
  loadEnv();

  return {
    name: 'iona-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next();

        const parsed = parseUrl(req.url, true);
        const match = resolveHandler(parsed.pathname);
        if (!match) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'not_found' }));
          return;
        }

        try {
          // Buffer the body and synthesize req.body as a string so handlers
          // that call readJson() can parse it. Upload endpoint reads the raw
          // stream — for that we leave req as-is and have already buffered.
          const isUpload = parsed.pathname.endsWith('/admin/upload');
          let bodyBuf = null;
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            bodyBuf = await readBody(req);
            if (!isUpload) req.body = bodyBuf.toString('utf8');
          }

          // For the upload route, swap req's data emitter so handler's
          // `for await (const chunk of req)` loop sees the buffered bytes.
          if (isUpload && bodyBuf) {
            const { Readable } = await import('node:stream');
            const stream = Readable.from([bodyBuf]);
            // copy headers/method/url onto the stream so it looks like req
            stream.headers = req.headers;
            stream.method = req.method;
            stream.url = req.url;
            stream.query = { ...parsed.query, ...match.params };
            // Replace request reference visible to handler
            req = stream;
          } else {
            req.query = { ...parsed.query, ...match.params };
          }

          // Dynamic import with cache-busting so edits to api/* hot-reload.
          const url = pathToFileURL(match.file).href + `?t=${Date.now()}`;
          const mod = await import(url);
          const handler = mod.default;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'no_default_export' }));
            return;
          }

          await handler(req, res);
        } catch (err) {
          console.error('[dev-api]', req.method, parsed.pathname, '→', err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'dev_api_failure', message: String(err.message || err) }));
          }
        }
      });
    },
  };
}
