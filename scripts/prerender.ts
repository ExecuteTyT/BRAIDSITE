// Post-build prerender: boots the built SPA in headless Chromium for every route
// and serializes the fully-rendered HTML (incl. <head> meta + JSON-LD) to
// dist/<route>/index.html so search bots receive real HTML without executing JS.
import fs from 'fs';
import path from 'path';
// @ts-ignore - no bundled types
import Prerenderer from '@prerenderer/prerenderer';
// @ts-ignore - no bundled types
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getAllRoutes } from './routes';

const DIST = path.resolve(process.cwd(), 'dist');

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const routes = getAllRoutes();
  console.log(`[prerender] ${routes.length} routes to render`);

  const prerenderer = new Prerenderer({
    staticDir: DIST,
    // SPA fallback: serve index.html for any path without a file on disk.
    indexPath: path.join(DIST, 'index.html'),
    renderer: new PuppeteerRenderer({
      renderAfterTime: 1400, // let useEffect set <title>/meta/JSON-LD
      maxConcurrentRoutes: 4,
      timeout: 60000,
      headless: true,
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      },
    }),
  });

  await prerenderer.initialize();

  try {
    const rendered: Array<{ route: string; html: string }> = await prerenderer.renderRoutes(routes);
    let written = 0;
    for (const r of rendered) {
      const route = r.route === '' ? '/' : r.route;
      const outDir = route === '/' ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, r.html.trim() + '\n', 'utf8');
      written++;
    }
    console.log(`[prerender] wrote ${written} HTML files`);
  } finally {
    await prerenderer.destroy();
  }
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
