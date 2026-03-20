// Динамический robots.txt для Vercel
// Блокирует индексацию на preview доменах, разрешает только на braidx.tech

export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';

  // Проверяем, является ли это production доменом
  const isProduction = host === 'braidx.tech' || host === 'www.braidx.tech';

  let robotsContent;

  if (!isProduction) {
    // Блокируем индексацию на всех не-production доменах
    robotsContent = `User-agent: *
Disallow: /

# Этот домен не предназначен для индексации
# Индексация разрешена только на https://braidx.tech`;
  } else {
    // Разрешаем индексацию только на production домене
    robotsContent = `User-agent: *
Allow: /

Sitemap: https://braidx.tech/sitemap.xml

# Закрываем технические страницы
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /404
Disallow: /.env
Disallow: /.git/

# Crawl-delay для вежливого сканирования
Crawl-delay: 1`;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.status(200).send(robotsContent);
}
