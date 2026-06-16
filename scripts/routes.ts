// Single source of truth for all prerenderable routes.
// Consumed by scripts/prerender.ts and scripts/sitemap.ts (run via vite-node so
// that import.meta.glob in the data registries resolves correctly).
import { landings } from '../data/landings';
import { articles } from '../data/blog';

export type RouteType = 'static' | 'landing' | 'article';

export interface RouteMeta {
  path: string;
  type: RouteType;
  /** ISO date (YYYY-MM-DD) for <lastmod> */
  lastmod: string;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const RU_MONTHS: Record<string, number> = {
  янв: 0, фев: 1, мар: 2, апр: 3, мая: 4, май: 4,
  июн: 5, июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
};

function ruDateToIso(s: string): string {
  const parts = s.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = RU_MONTHS[parts[1].toLowerCase().slice(0, 3)] ?? 0;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year)) {
      return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
    }
  }
  return BUILD_DATE;
}

// vite-node lacks Date.now in some contexts but new Date() works here at runtime.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// Static routes that are not data-driven. /legal is a placeholder and excluded.
const STATIC: Array<Omit<RouteMeta, 'lastmod'> & { lastmod?: string }> = [
  { path: '/', type: 'static', priority: 1.0, changefreq: 'daily' },
  { path: '/technology', type: 'static', priority: 0.8, changefreq: 'monthly' },
  { path: '/pricing', type: 'static', priority: 0.9, changefreq: 'weekly' },
  { path: '/locations', type: 'static', priority: 0.8, changefreq: 'monthly' },
  { path: '/download', type: 'static', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', type: 'static', priority: 0.85, changefreq: 'weekly' },
  { path: '/youtube-bez-reklamy', type: 'static', priority: 0.95, changefreq: 'weekly' },
  { path: '/pri-blokirovkah', type: 'static', priority: 0.95, changefreq: 'weekly' },
  { path: '/chatgpt', type: 'static', priority: 0.9, changefreq: 'weekly' },
  { path: '/android', type: 'static', priority: 0.85, changefreq: 'monthly' },
  { path: '/ios', type: 'static', priority: 0.85, changefreq: 'monthly' },
  { path: '/windows', type: 'static', priority: 0.85, changefreq: 'monthly' },
  { path: '/mac', type: 'static', priority: 0.85, changefreq: 'monthly' },
];

export function getRouteManifest(): RouteMeta[] {
  const manifest: RouteMeta[] = [];

  for (const r of STATIC) {
    manifest.push({ ...r, lastmod: r.lastmod ?? BUILD_DATE });
  }

  for (const l of landings) {
    manifest.push({
      path: l.path,
      type: 'landing',
      lastmod: BUILD_DATE,
      priority: 0.9,
      changefreq: 'weekly',
    });
  }

  for (const a of articles) {
    manifest.push({
      path: `/blog/${a.slug}`,
      type: 'article',
      lastmod: ruDateToIso(a.date),
      priority: 0.7,
      changefreq: 'monthly',
    });
  }

  // De-dup by path (a landing could in theory collide with a static path).
  const seen = new Set<string>();
  return manifest.filter((m) => {
    if (seen.has(m.path)) return false;
    seen.add(m.path);
    return true;
  });
}

export function getAllRoutes(): string[] {
  return getRouteManifest().map((m) => m.path);
}
