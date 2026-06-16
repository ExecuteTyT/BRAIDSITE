import type { LandingConfig } from '../types';

const cfg: LandingConfig = {
  slug: 'dlya-igr-pubg',
  path: '/dlya-igr/pubg',
  title: 'VPN для PUBG — низкий пинг и защита от DDoS 2026',
  metaDescription: 'VPN для PUBG с минимальным пингом до серверов Европы и Азии. Защита от DDoS на стримах, обход замедлений оператора. 7 дней бесплатно.',
  keywords: ['VPN для PUBG', 'VPN для пубг', 'PUBG низкий пинг', 'PUBG DDoS', 'PUBG VPN EU', 'PUBG обход'],
  breadcrumb: 'VPN для PUBG',
  hero: {
    badge: 'PUBG без лагов',
    badgeIcon: 'gamepad',
    h1: 'VPN для PUBG — пинг до серверов EU и AS',
    lead: 'BRAID VPN — финский сервер 30ms до PUBG EU, защита от DDoS, обход замедления UDP-трафика операторами связи.',
    primaryCta: 'Подключить VPN для PUBG',
    bullets: ['PUBG EU 30ms', 'Защита от DDoS', 'UDP-оптимизация', '7 дней бесплатно'],
  },
  pain: {
    h2: 'Проблемы PUBG в России',
    items: [
      { title: 'Пинг 80ms на EU-серверах', text: 'В королевской битве 30 человек на финальной зоне — каждая миллисекунда лага = смерть.' },
      { title: 'UDP замедление', text: 'PUBG использует UDP. Операторы (особенно МТС) режут UDP-приоритет — отсюда rubber-banding и пропадание игроков.' },
      { title: 'DDoS на топ-100', text: 'Высокий ранг = цель для атак. Особенно у стримеров — один матч на FPP-турнир сожжён.' },
      { title: 'Steam region-lock', text: 'Battle Pass дешевле в Турции/Аргентине, но Steam требует региональную карту.' },
    ],
  },
  solution: {
    h2: 'Что даёт BRAID VPN',
    intro: 'BRAID VPN снижает пинг и стабилизирует UDP-трафик PUBG: вы играете на EU-серверах без потерь пакетов и rubber-banding.',
    benefits: [
      { icon: 'zap', title: 'Пинг 30–45ms до EU', text: 'Финский / нидерландский серверы — оптимально для PUBG EU Battle Royale.' },
      { icon: 'server', title: 'UDP без задержек', text: 'Игровой UDP-трафик идёт по приоритетным маршрутам. Никаких rubber-banding.' },
      { icon: 'shield', title: 'IP скрыт', text: 'Стримите топ-100? DDoS-атаки больше не страшны.' },
      { icon: 'globe', title: 'Asia / NA', text: 'Хотите азиатских игроков? Через нашу инфраструктуру пинг до AS — 180–220ms (приемлемо для PUBG).' },
    ],
  },
  howItWorks: {
    h2: 'Настройка для PUBG',
    steps: [
      { title: 'Получите ключ', text: '@braidvpn_bot. 7 дней бесплатно.' },
      { title: 'Установите Happ', text: 'Скачайте Happ для Windows.' },
      { title: 'Подключите Финляндию', text: 'Для EU-серверов — Финляндия. Для NA — США.' },
      { title: 'Запустите PUBG', text: 'Откройте Steam → PUBG → Match. Пинг должен быть 30–45ms.' },
    ],
  },
  faq: {
    h2: 'FAQ — VPN для PUBG',
    items: [
      { q: 'Не получу ли бан от BattlEye?', a: 'Нет. BattlEye проверяет процессы и драйверы, а не сеть. VLESS Reality не виден на уровне античита.' },
      { q: 'Поможет ли VPN с rubber-banding?', a: 'Да, если проблема в оператора. VPN маскирует трафик, оператор не может его опознать и замедлить.' },
      { q: 'Какой сервер для FPP / TPP?', a: 'Любой EU-сервер (Финляндия или Нидерланды) подходит для FPP и TPP режимов.' },
    ],
  },
  relatedLandings: [
    { path: '/dlya-igr', title: 'VPN для игр', desc: 'Все игровые лендинги' },
    { path: '/dlya-igr/cs2', title: 'VPN для CS2', desc: 'Counter-Strike 2' },
    { path: '/discord', title: 'VPN для Discord', desc: 'Тимспик с друзьями' },
  ],
  relatedArticles: ['vpn-gaming'],
};

export default cfg;
