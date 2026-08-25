// Notifies IndexNow (Bing, Yandex and other participating search engines)
// that URLs in the sitemap have changed, so they can be recrawled without
// waiting for the next scheduled crawl. Google does not participate in
// IndexNow — see Search Console for Google-specific submission.
//
// Usage: node scripts/submit-indexnow.mjs
// Run this manually after a production deploy, once the new content is
// actually live (not at build time, before the deploy has shipped).

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../src/data/seo.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const KEY = 'e1629d710f03c763d170b135be30da1e';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const host = new URL(SITE_URL).hostname;

const sitemapXml = await readFile(join(root, 'public', 'sitemap.xml'), 'utf8');
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('No URLs found in public/sitemap.xml — nothing to submit.');
  process.exit(1);
}

const body = {
  host,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow: submitted ${urlList.length} URLs — status ${res.status} ${res.statusText}`);
if (!res.ok) {
  const text = await res.text().catch(() => '');
  if (text) console.error(text);
  process.exit(1);
}
