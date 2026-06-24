// Аналитика BRAID VPN через Яндекс.Метрику.
// Содержит главную конверсию (telegram_click) и микро-цели для обучения
// автостратегий и анализа воронки (scroll_75, time_on_site_60s, download_click,
// pricing_view). Все цели создаются в кабинете Метрики скриптом scripts/metrika-goals.ts.

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
    __braidAnalyticsInit?: boolean;
  }
}

const YANDEX_METRIKA_ID = 107083162;

/** Универсальная отправка цели в Метрику. */
export const reachGoal = (goal: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined' || !window.ym) return;
  try {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', goal, params);
  } catch (error) {
    console.error('Yandex Metrika reachGoal error:', error);
  }
};

/** Главная конверсия — клик по CTA в Telegram-бота. */
export const trackTelegramClick = (buttonLocation: string) => {
  reachGoal('telegram_click', { location: buttonLocation, url: window.location.href });
  if (typeof window !== 'undefined' && window.ym) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'extLink', 'https://t.me/braidvpn_bot', { location: buttonLocation });
    } catch {
      /* noop */
    }
  }
};

const isTelegram = (href: string) => href.includes('t.me/braidvpn_bot');
const isDownload = (href: string) =>
  /apps\.apple\.com|play\.google\.com|apps\.microsoft\.com|github\.com\/.+\/releases|\.(exe|dmg|apk|ipa|zip)(\?|$)/i.test(href) ||
  href.includes('happ');

const locationOf = (a: HTMLAnchorElement): string => {
  const cls = a.className || '';
  const text = a.textContent || '';
  if (a.closest('footer')) return 'footer';
  if (a.closest('nav') || cls.includes('nav')) return 'navbar';
  if (a.closest('article') || a.closest('.article')) return 'article';
  if (/получить|ключ/i.test(text)) return 'cta_get_key';
  if (/попроб|бесплатн/i.test(text)) return 'cta_try_free';
  if (/поддержк/i.test(text)) return 'support_link';
  return 'cta_button';
};

// --- Микро-цели ---

let scrollGoalFired = false;
const initScrollDepthGoal = () => {
  const onScroll = () => {
    if (scrollGoalFired) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    if (total > 0 && scrolled / total >= 0.75) {
      scrollGoalFired = true;
      reachGoal('scroll_75');
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
};

const initTimeOnSiteGoal = () => {
  window.setTimeout(() => reachGoal('time_on_site_60s'), 60000);
};

/**
 * Единая инициализация аналитики. Использует делегирование на document, поэтому
 * корректно ловит клики и по динамически отрисованным (SPA) ссылкам.
 * Имя сохранено для обратной совместимости с App.tsx.
 */
export const initTelegramTracking = () => {
  if (typeof window === 'undefined' || window.__braidAnalyticsInit) return;
  window.__braidAnalyticsInit = true;

  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (isTelegram(href)) {
        trackTelegramClick(locationOf(a));
      } else if (isDownload(href)) {
        reachGoal('download_click', { url: href, page: window.location.pathname });
      }
    },
    { capture: true }
  );

  initScrollDepthGoal();
  initTimeOnSiteGoal();
};

/** Обратная совместимость: ручная привязка (больше не нужна с делегированием). */
export const addTelegramTracking = (element: HTMLElement | null, location: string) => {
  if (!element) return;
  element.addEventListener('click', () => trackTelegramClick(location));
};
