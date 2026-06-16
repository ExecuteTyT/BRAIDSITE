// Centralized per-route SEO head management.
//
// Pure DOM mutation (no library) — this is intentionally framework-light so the
// puppeteer prerender step (scripts/prerender.ts) serializes the final <head>
// for every route without any SSR/hydration wiring. All page components call
// applySeo() from a useEffect; the prerenderer waits, then snapshots the result.

export const SITE_URL = 'https://braidpro.tech';
export const SITE_NAME = 'BRAID VPN';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoConfig {
  /** Full document title. Caller decides whether to append the brand. */
  title: string;
  description: string;
  /** Pathname only (e.g. "/discord"); domain is added for canonical/OG url. */
  path: string;
  keywords?: string | string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  /** Structured data object(s) injected as a single JSON-LD <script>. */
  jsonLd?: object | object[];
}

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeo(cfg: SeoConfig): void {
  const canonical = `${SITE_URL}${cfg.path === '/' ? '/' : cfg.path}`;
  const ogImage = cfg.ogImage || DEFAULT_OG_IMAGE;
  const keywords = Array.isArray(cfg.keywords) ? cfg.keywords.join(', ') : cfg.keywords;

  document.title = cfg.title;

  upsertMeta('name', 'description', cfg.description);
  if (keywords) upsertMeta('name', 'keywords', keywords);
  upsertLink('canonical', canonical);

  // Open Graph
  upsertMeta('property', 'og:title', cfg.title);
  upsertMeta('property', 'og:description', cfg.description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:type', cfg.ogType || 'website');
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('property', 'og:image:secure_url', ogImage);
  upsertMeta('property', 'og:site_name', SITE_NAME);

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', cfg.title);
  upsertMeta('name', 'twitter:description', cfg.description);
  upsertMeta('name', 'twitter:image', ogImage);

  // Structured data — replace any previously injected per-route block.
  document.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove());
  if (cfg.jsonLd) {
    const blocks = Array.isArray(cfg.jsonLd) ? cfg.jsonLd : [cfg.jsonLd];
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
    document.head.appendChild(script);
  }
}

/** @deprecated Back-compat alias — use applySeo. */
export const updateMeta = applySeo;

// ---- Structured-data builders (reused across page types) ----

export function breadcrumbLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function articleLd(opts: {
  title: string;
  description: string;
  keywords: string[];
  datePublished: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    keywords: opts.keywords.join(', '),
    datePublished: opts.datePublished,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${opts.path}` },
  };
}
