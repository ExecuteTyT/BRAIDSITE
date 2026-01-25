// Динамический robots.txt для Vercel
// Блокирует индексацию на preview доменах, разрешает только на braidvpn.ru

export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  
  // Проверяем, является ли это preview доменом Vercel
  const isVercelPreview = host.includes('.vercel.app') || host.includes('.vercel.sh');
  
  // Проверяем, является ли это production доменом
  const isProduction = host === 'braidvpn.ru' || host === 'www.braidvpn.ru';
  
  let robotsContent;
  
  if (isVercelPreview || !isProduction) {
    // Блокируем индексацию на preview доменах и других доменах
    robotsContent = `User-agent: *
Disallow: /

# Этот домен не предназначен для индексации
# Индексация разрешена только на https://braidvpn.ru`;
  } else {
    // Разрешаем индексацию только на production домене
    robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://braidvpn.ru/sitemap.xml

# Блокируем служебные директории
Disallow: /api/
Disallow: /admin/
Disallow: /.env
Disallow: /.git/

# Разрешаем все страницы сайта
Allow: /
Allow: /#/
Allow: /#/technology
Allow: /#/pricing
Allow: /#/locations
Allow: /#/download
Allow: /#/blog
Allow: /#/blog/

# Crawl-delay для вежливого сканирования
Crawl-delay: 1`;
  }
  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.status(200).send(robotsContent);
}
