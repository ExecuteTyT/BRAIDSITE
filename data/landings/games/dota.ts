import type { LandingConfig } from '../types';

const cfg: LandingConfig = {
  slug: 'dlya-igr-dota',
  path: '/dlya-igr/dota',
  title: 'VPN для Dota 2 — снизить пинг, защита от DDoS 2026',
  metaDescription: 'VPN для Dota 2 с минимальным пингом до серверов EU West и EU East. Защита от DDoS, обход блокировок Steam. Финский сервер 30ms. 7 дней бесплатно.',
  keywords: ['VPN для Dota', 'VPN для Dota 2', 'снизить пинг Dota', 'Dota DDoS защита', 'VPN Dota EU', 'Дота VPN'],
  breadcrumb: 'VPN для Dota 2',
  hero: {
    badge: 'Dota 2 без лагов',
    badgeIcon: 'gamepad',
    h1: 'VPN для Dota 2 — снизить пинг и обойти лаги',
    lead: 'Финский сервер BRAID VPN даёт пинг 30ms до Dota 2 EU West. Защита от DDoS, обход замедлений оператора, доступ к региональным турнирам.',
    primaryCta: 'Снизить пинг в Dota 2',
    bullets: ['EU West 30ms', 'Защита от DDoS', 'Доступ к Steam US', '7 дней бесплатно'],
  },
  pain: {
    h2: 'Что не так с Dota 2 у российских игроков',
    items: [
      { title: 'Пинг 80–100ms на EU West', text: 'Провайдер ведёт трафик через Стокгольм или Берлин — задержка катастрофическая для микроконтроля.' },
      { title: 'DDoS-атаки на ранкеде', text: 'В высоком ММР злоумышленники узнают IP через стрим и валят атакой. Полтора часа матча — впустую.' },
      { title: 'Лаги в командных боях', text: 'Оператор замедляет UDP — в файтах появляется rubber-banding, лагает движение фрейма.' },
      { title: 'Region-lock на International', text: 'Часть бандлов и компендиумов недоступна для русского региона Steam.' },
    ],
  },
  solution: {
    h2: 'Как BRAID VPN решает проблемы Dota 2',
    intro: 'Финский сервер близок географически к серверам Dota EU West/East. UDP-маршруты оптимизированы. DDoS-защита включена.',
    benefits: [
      { icon: 'zap', title: 'Пинг 30ms до EU West', text: 'Прямой маршрут Москва → Хельсинки → Люксембург. Минимальная задержка для тимфайтов.' },
      { icon: 'shield', title: 'Реальный IP скрыт', text: 'Стримеры — забудьте о DDoS. Атакующий не знает вашего реального IP.' },
      { icon: 'server', title: 'UDP без потерь', text: 'Игровой UDP идёт по приоритетным каналам, оператор не может его замедлить.' },
      { icon: 'globe', title: 'Steam US и EU', text: 'Покупайте Battle Pass и аркану там, где дешевле. Открывайте региональные эвенты.' },
    ],
  },
  howItWorks: {
    h2: 'Настройка для Dota 2',
    steps: [
      { title: 'Получите ключ', text: 'В Telegram-боте @braidvpn_bot — бесплатный ключ на 7 дней.' },
      { title: 'Установите Happ', text: 'Скачайте Happ для Windows или macOS — это ваш игровой клиент.' },
      { title: 'Подключитесь к Финляндии', text: 'В Happ выберите «Финляндия (Хельсинки)» — оптимально для EU West.' },
      { title: 'Запустите Dota 2', text: 'Откройте Steam → Dota 2. Пинг отображается в правом углу. Должно быть 30–45ms.' },
    ],
  },
  faq: {
    h2: 'FAQ — VPN для Dota 2',
    items: [
      { q: 'Какой регион выбрать в Dota 2?', a: 'EU West — для матчмейкинга через Финляндию (30ms). EU East — тоже подходит, пинг ~25ms. US East — через США (~120ms).' },
      { q: 'Не получу ли я бан от Valve за VPN?', a: 'Нет, Valve не банит за использование VPN. Десятки тысяч игроков из РФ играют через VPN ежедневно без проблем.' },
      { q: 'Можно ли купить Battle Pass дешевле через VPN?', a: 'Технически возможно через смену региона Steam, но Valve может ограничить аккаунт. Безопаснее покупать в своём регионе.' },
      { q: 'Поможет ли VPN с лагами от провайдера?', a: 'Да, если провайдер замедляет игровой UDP-трафик. VLESS Reality маскирует трафик, и оператор не может его опознать и замедлить.' },
    ],
  },
  relatedLandings: [
    { path: '/dlya-igr', title: 'VPN для игр (хаб)', desc: 'Все игровые лендинги' },
    { path: '/dlya-igr/cs2', title: 'VPN для CS2', desc: 'Counter-Strike без лагов' },
    { path: '/discord', title: 'VPN для Discord', desc: 'Голосовой чат с тимой' },
  ],
  relatedArticles: ['vpn-gaming'],
};

export default cfg;
