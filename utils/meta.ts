const SITE_URL = 'https://braidx.tech';
const SITE_NAME = 'BRAID VPN';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
}

export function updateMeta(meta: PageMeta) {
  const canonical = `${SITE_URL}${meta.path}`;
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

  document.title = meta.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', canonical);

  if (meta.keywords) {
    setMeta('meta[name="keywords"]', 'content', meta.keywords);
  }

  // Open Graph
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', canonical);
  setMeta('meta[property="og:image"]', 'content', ogImage);
  setMeta('meta[property="og:image:secure_url"]', 'content', ogImage);

  // Twitter
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);
  setMeta('meta[name="twitter:image"]', 'content', ogImage);
}
