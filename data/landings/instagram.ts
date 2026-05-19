import type { LandingConfig } from './types';

const cfg: LandingConfig = {
  slug: 'instagram',
  path: '/instagram',
  title: 'VPN для Instagram — открыть Инстаграм в России 2026',
  metaDescription: 'Instagram заблокирован в России? Восстановите доступ через BRAID VPN: лента, Reels, Direct, Stories. Быстро, без обрывов. 7 дней бесплатно.',
  keywords: ['VPN для Instagram', 'VPN для инстаграм', 'обход блокировки Instagram', 'Instagram в России', 'инстаграм заблокирован', 'instagram reels VPN'],
  breadcrumb: 'VPN для Instagram',
  hero: {
    badge: 'Instagram открыт',
    badgeIcon: 'heart',
    h1: 'VPN для Instagram — открыть Инстаграм из России',
    lead: 'Instagram заблокирован Роскомнадзором с марта 2022 года. BRAID VPN восстанавливает полный доступ: лента, Reels, Stories, Direct — за 30 секунд.',
    primaryCta: 'Открыть Instagram за 30 секунд',
    bullets: ['Лента + Reels', 'Direct сообщения', 'Stories и Live', '7 дней бесплатно'],
  },
  pain: {
    h2: 'Почему Instagram не работает в России',
    intro: 'Instagram внесён в реестр заблокированных ресурсов с 14 марта 2022 года. Без VPN полностью недоступен.',
    items: [
      { title: 'Не открываются профили', text: 'Прямой переход по ссылкам не работает — браузер показывает ошибку или страницу РКН.' },
      { title: 'Не загружается лента', text: 'Приложение Instagram открывается, но лента и Reels висят на загрузке бесконечно.' },
      { title: 'Не отправляются Direct', text: 'Сообщения не отправляются и не приходят, синхронизация ломается.' },
      { title: 'Обычные VPN блокируются', text: 'NordVPN, ExpressVPN и другие крупные сервисы периодически отваливаются — РКН блокирует их серверы.' },
    ],
  },
  solution: {
    h2: 'Как BRAID VPN восстанавливает Instagram',
    intro: 'Мы используем протокол VLESS Reality — невидимый для блокировок РКН. Instagram работает как до 2022 года.',
    benefits: [
      { icon: 'shield', title: 'Невидим для DPI', text: 'Трафик маскируется под обычный HTTPS. РКН не блокирует, оператор не замедляет.' },
      { icon: 'zap', title: 'Reels в HD без буферизации', text: 'Гигабитные серверы — Reels запускаются мгновенно, никаких подгрузок.' },
      { icon: 'globe', title: 'Сервер Нидерланды', text: 'Оптимально для Instagram. Пинг ~45ms, серверы Meta близко географически.' },
      { icon: 'lock', title: 'Защита аккаунта', text: 'Шифрование TLS 1.3 защищает логин и пароль от перехвата в публичном Wi-Fi.' },
      { icon: 'smartphone', title: 'Работает на iPhone и Android', text: 'Без джейлбрейка и root. Просто Happ из App Store или Google Play.' },
      { icon: 'users', title: '5 устройств', text: 'Один ключ — на телефон, планшет, ноутбук. Одновременно.' },
    ],
  },
  howItWorks: {
    h2: 'Как открыть Instagram за 4 шага',
    steps: [
      { title: 'Получите ключ', text: 'В Telegram-боте @braidvpn_bot нажмите «Получить ключ». 7 дней бесплатно.' },
      { title: 'Скачайте Happ', text: 'iPhone — App Store, Android — Google Play. Размер приложения ~30 МБ.' },
      { title: 'Выберите Нидерланды', text: 'В Happ откройте список серверов и выберите «Нидерланды (Амстердам)».' },
      { title: 'Откройте Instagram', text: 'Лента, Reels, Direct, Stories — всё работает. Если приложение тормозит, перезапустите.' },
    ],
  },
  faq: {
    h2: 'FAQ — Instagram через VPN',
    items: [
      { q: 'Это легально?', a: 'Использование VPN в России не запрещено. Закон не запрещает доступ к Instagram через VPN — никаких санкций для частных лиц нет.' },
      { q: 'Заблокируют ли мой аккаунт?', a: 'Нет, Instagram не банит аккаунты за использование VPN. Миллионы россиян пользуются Instagram через VPN ежедневно с 2022 года без проблем.' },
      { q: 'Какой сервер выбрать?', a: 'Нидерланды (Амстердам) — лучший выбор: близко географически, низкий пинг, серверы Meta рядом. США тоже работают, но пинг выше.' },
      { q: 'Можно ли публиковать Stories и Reels?', a: 'Да, полная функциональность Instagram работает через VPN. Публикуйте Stories, Reels, посты, ведите Live-эфиры.' },
      { q: 'Работают ли Direct-сообщения?', a: 'Да, Direct, голосовые сообщения, видеозвонки — всё функционирует через VPN без задержек.' },
      { q: 'Сколько стоит?', a: '7 дней бесплатно без карты. Дальше — 163₽/мес при годовой подписке. До 5 устройств.' },
    ],
  },
  relatedLandings: [
    { path: '/tiktok', title: 'VPN для TikTok', desc: 'Загрузка видео и эфиры в TikTok' },
    { path: '/whatsapp', title: 'VPN для WhatsApp', desc: 'WhatsApp при ограничениях оператора' },
    { path: '/obhod-blokirovok', title: 'Обход блокировок', desc: 'Полный список и обходные пути' },
  ],
  relatedArticles: ['bypass-blocks-2026', 'vpn-comparison-2026'],
};

export default cfg;
