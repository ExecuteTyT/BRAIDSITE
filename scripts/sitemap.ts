// Generates dist/sitemap.xml from the same route manifest the prerenderer uses,
// so the sitemap can never drift from what actually ships.
import fs from 'fs';
import path from 'path';
import { getRouteManifest } from './routes';

const SITE = 'https://braidpro.tech';
const DIST = path.resolve(process.cwd(), 'dist');

function main() {
  const manifest = getRouteManifest();
  const urls = manifest
    .map((m) => {
      const loc = `${SITE}${m.path === '/' ? '/' : m.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${m.lastmod}</lastmod>`,
        `    <changefreq>${m.changefreq}</changefreq>`,
        `    <priority>${m.priority.toFixed(2)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
  // Keep public/ copy in sync for local dev / non-build serving.
  fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), xml, 'utf8');
  console.log(`[sitemap] wrote ${manifest.length} urls to dist/sitemap.xml`);
}

main();
