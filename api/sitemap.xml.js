// Динамический sitemap для Vercel
// Работает как с preview доменами, так и с кастомным доменом

export default function handler(req, res) {
  // Определяем базовый URL
  // Vercel автоматически добавляет заголовки
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'braidvpn.ru';
  const baseUrl = `${protocol}://${host}`;

  // Список страниц сайта
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/#/technology', priority: '0.8', changefreq: 'monthly' },
    { path: '/#/pricing', priority: '0.9', changefreq: 'monthly' },
    { path: '/#/locations', priority: '0.8', changefreq: 'monthly' },
    { path: '/#/download', priority: '0.8', changefreq: 'monthly' },
    { path: '/#/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/#/blog/bypass-blocks-2026', priority: '0.7', changefreq: 'monthly' },
    { path: '/#/blog/youtube-no-ads', priority: '0.7', changefreq: 'monthly' },
    { path: '/#/blog/vpn-gaming', priority: '0.7', changefreq: 'monthly' },
    { path: '/#/blog/vless-vs-openvpn', priority: '0.7', changefreq: 'monthly' },
    { path: '/#/blog/vpn-comparison-2026', priority: '0.7', changefreq: 'monthly' },
    { path: '/#/legal', priority: '0.3', changefreq: 'yearly' },
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
}
