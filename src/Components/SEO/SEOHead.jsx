import { useEffect } from 'react';
import {
  absoluteUrl,
  buildHomeStructuredData,
  homeSeo,
  siteSeo,
} from '../../data/seo';

const DEFAULT_IMAGE = siteSeo.image;

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function setStructuredData(data) {
  let element = document.head.querySelector('#page-structured-data');
  if (!element) {
    element = document.createElement('script');
    element.id = 'page-structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export default function SEOHead({
  title = homeSeo.metaTitle,
  description = homeSeo.metaDescription,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData = buildHomeStructuredData(),
}) {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

    document.title = title;
    document.documentElement.lang = 'en';

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });
    setMeta('meta[name="author"]', { name: 'author', content: siteSeo.name });
    setMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#020617' });

    setCanonical(canonical);

    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteSeo.name });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${siteSeo.name} service preview` });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    setStructuredData(structuredData);
  }, [description, image, path, structuredData, title, type]);

  return null;
}
