import type { LandingConfig } from '../types';

const cfg: LandingConfig = {
  slug: 'dlya-igr-valorant',
  path: '/dlya-igr/valorant',
  title: 'VPN для Valorant — Riot не банит, низкий пинг 2026',
  metaDescription: 'VPN для Valorant с маскировкой под HTTPS — Riot Vanguard не распознаёт VPN. Низкий пинг до EU-серверов, защита от DDoS. 7 дней бесплатно.',
  keywords: ['VPN для Valorant', 'Valorant VPN', 'Valorant низкий пинг', 'Riot Vanguard VPN', 'Valorant обход', 'Valorant EU'],
  breadcrumb: 'VPN для Valorant',
  hero: {
    badge: 'Valorant без банов',
    badgeIcon: 'gamepad',
    h1: 'VPN для Valorant — Riot Vanguard не распознаёт',
    lead: 'VLESS Reality маскирует VPN-трафик под обычный HTTPS — Riot Vanguard не банит. Финский сервер даёт пинг 35ms до Valorant EU.',
    primaryCta: 'Подключить VPN для Valorant',
    bullets: ['Vanguard не банит', 'EU 35ms', 'NA сервера', '7 дней бесплатно'],
  },
  pain: {
    h2: 'Проблемы Valorant в России',
    items: [
      { title: 'Riot блокирует VPN', text: 'Riot активно блокирует популярные VPN — ExpressVPN, NordVPN. При обнаружении — кикнет с матча.' },
      { title: 'Vanguard агрессивен', text: 'Античит Riot Vanguard работает на уровне ядра ОС и подозрительно относится к сетевым модификациям.' },
      { title: 'Высокий пинг до EU', text: 'Российские провайдеры ведут трафик через 3–4 узла. Пинг до Valorant EU достигает 80ms.' },
      { title: 'Region-lock на скины', text: 'Часть Battle Pass и эксклюзивных скинов недоступна для русского региона.' },
    ],
  },
  solution: {
    h2: 'Почему BRAID VPN работает с Valorant',
    intro: 'VLESS Reality технически отличается от обычных VPN — Riot не может его опознать. Маскировка под HTTPS делает трафик незаметным.',
    benefits: [
      { icon: 'shield', title: 'Невидим для Vanguard', text: 'Riot Vanguard проверяет процессы и драйверы. VLESS Reality — это просто HTTPS-соединение, ничего подозрительного.' },
      { icon: 'zap', title: 'Пинг 35ms до EU', text: 'Финский сервер близок к Valorant EU дата-центрам. Хватит для соревновательного play.' },
      { icon: 'globe', title: 'NA для турниров', text: 'Хотите потренироваться против американских игроков? Через США пинг 130ms — достаточно для деф-игры.' },
      { icon: 'lock', title: 'Защита от DDoS', text: 'Стримите Valorant? Реальный IP скрыт — DDoSить вас просто нечем.' },
    ],
  },
  howItWorks: {
    h2: 'Настройка для Valorant',
    steps: [
      { title: 'Получите ключ', text: '@braidvpn_bot → «Получить ключ». 7 дней бесплатно.' },
      { title: 'Установите Happ', text: 'Скачайте Happ для Windows.' },
      { title: 'Подключите Финляндию', text: 'В Happ выберите «Финляндия» для EU-серверов или «США» для NA.' },
      { title: 'Запустите Valorant', text: 'Откройте Riot Client → Valorant. Vanguard не распознает VPN, можете играть.' },
    ],
  },
  faq: {
    h2: 'FAQ — VPN для Valorant',
    items: [
      { q: 'Riot не забанит за VPN?', a: 'С BRAID VPN — нет. Riot блокирует популярные VPN (NordVPN, ExpressVPN) по списку IP. У нас приватные IP-пулы, которые не в чёрном списке Riot.' },
      { q: 'Какой регион выбрать в Valorant?', a: 'Europe — оптимально через Финляндию (35ms). North America — через США (130ms), для тренировок с NA-игроками.' },
      { q: 'Поможет ли с region-lock на скины?', a: 'Технически — да, но Riot отслеживает регион аккаунта. Лучше создать аккаунт сразу в нужном регионе.' },
      { q: 'Vanguard видит VPN?', a: 'Нет, Vanguard работает на уровне kernel и проверяет процессы. Сетевой трафик не анализирует. VLESS Reality для него — обычное HTTPS.' },
    ],
  },
  relatedLandings: [
    { path: '/dlya-igr', title: 'VPN для игр', desc: 'Все игровые лендинги' },
    { path: '/dlya-igr/cs2', title: 'VPN для CS2', desc: 'Counter-Strike 2' },
    { path: '/discord', title: 'VPN для Discord', desc: 'Голосовой чат' },
  ],
  relatedArticles: ['vpn-gaming'],
};

export default cfg;
