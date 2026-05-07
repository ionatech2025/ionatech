import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteSeo, staticSeoPages } from '../src/data/seo.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');
const indexHtml = await readFile(indexPath, 'utf8');

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function setMetaName(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta name="${name}" content="[^"]*"\\s*/?>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function setMetaProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta property="${property}" content="[^"]*"\\s*/?>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function applyPageSeo(page) {
  const image = siteSeo.image;
  let html = indexHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(page.metaTitle)}</title>`);
  html = setMetaName(html, 'description', page.metaDescription);
  html = setMetaName(html, 'robots', 'index, follow, max-image-preview:large');
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeAttribute(page.canonical)}" />`,
  );
  html = setMetaProperty(html, 'og:type', 'website');
  html = setMetaProperty(html, 'og:site_name', siteSeo.name);
  html = setMetaProperty(html, 'og:title', page.metaTitle);
  html = setMetaProperty(html, 'og:description', page.metaDescription);
  html = setMetaProperty(html, 'og:url', page.canonical);
  html = setMetaProperty(html, 'og:image', image);
  html = setMetaProperty(html, 'og:image:secure_url', image);
  html = setMetaProperty(html, 'og:image:type', siteSeo.imageType);
  html = setMetaProperty(html, 'og:image:width', siteSeo.imageWidth);
  html = setMetaProperty(html, 'og:image:height', siteSeo.imageHeight);
  html = setMetaProperty(html, 'og:image:alt', `${siteSeo.name} ${page.title || page.h1 || 'technology services'}`);
  html = setMetaName(html, 'twitter:title', page.metaTitle);
  html = setMetaName(html, 'twitter:description', page.metaDescription);
  html = setMetaName(html, 'twitter:image', image);
  html = html.replace(
    /<script id="page-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="page-structured-data" type="application/ld+json">\n${JSON.stringify(page.structuredData, null, 2)}\n  </script>`,
  );

  return html;
}

for (const page of staticSeoPages) {
  const outputPath = join(dist, page.path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, applyPageSeo(page));
  console.log(`seo: wrote ${page.path}`);
}
