// Yandex.Metrika integration: SPA route tracking, conversion goals, scroll depth.
//
// The counter itself is loaded in index.html. This module wraps the `ym(...)`
// global with a typed API and provides React hooks for common patterns.

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

export const YANDEX_METRIKA_ID = 107083162;

/** Goal names — keep in sync with the goals configured in Yandex.Metrika UI. */
export const Goals = {
  TELEGRAM_CLICK: 'telegram_click',
  PRICING_VIEW: 'pricing_view',
  BESPLATNO_VIEW: 'besplatno_view',
  KUPIT_VIEW: 'kupit_view',
  LANDING_VIEW: 'landing_view',
  ARTICLE_READ: 'article_read',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  SCROLL_100: 'scroll_100',
  DOWNLOAD_CLICK: 'download_click',
  PROXY_CLICK: 'proxy_click',
} as const;

export type GoalName = (typeof Goals)[keyof typeof Goals] | string;

const isMetrikaReady = (): boolean =>
  typeof window !== 'undefined' && typeof window.ym === 'function';

/** Track a virtual pageview for the given path. Used on SPA route changes. */
export function trackPageview(path: string): void {
  if (!isMetrikaReady()) return;
  try {
    const url = `${window.location.origin}${path}`;
    window.ym!(YANDEX_METRIKA_ID, 'hit', url, {
      referer: document.referrer,
      title: document.title,
    });
  } catch (err) {
    if (typeof console !== 'undefined') console.error('[metrika] hit failed', err);
  }
}

/** Send a conversion goal with optional params. */
export function trackGoal(name: GoalName, params?: Record<string, unknown>): void {
  if (!isMetrikaReady()) return;
  try {
    window.ym!(YANDEX_METRIKA_ID, 'reachGoal', name, params ?? {});
  } catch (err) {
    if (typeof console !== 'undefined') console.error('[metrika] goal failed', err);
  }
}

/** Track an outbound link click. */
export function trackExtLink(url: string, params?: Record<string, unknown>): void {
  if (!isMetrikaReady()) return;
  try {
    window.ym!(YANDEX_METRIKA_ID, 'extLink', url, params ?? {});
  } catch (err) {
    if (typeof console !== 'undefined') console.error('[metrika] extLink failed', err);
  }
}

// ---- React hooks ----

/**
 * Auto-fires a pageview hit on every SPA route change.
 * Also triggers route-specific goal hits for high-intent pages.
 * Call this once at the top of the App tree.
 */
export function useRouteTracking(): void {
  const location = useLocation();
  const lastPathRef = useRef<string>('');

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    if (fullPath === lastPathRef.current) return;
    lastPathRef.current = fullPath;

    // Defer one tick so document.title has time to update from the new route's
    // useEffect (which usually runs after Router commits).
    const timer = setTimeout(() => {
      trackPageview(fullPath);

      // Route-specific conversion goals — high-intent pages get their own goal.
      const p = location.pathname;
      if (p === '/pricing') trackGoal(Goals.PRICING_VIEW);
      else if (p === '/besplatno') trackGoal(Goals.BESPLATNO_VIEW);
      else if (p === '/kupit-vpn') trackGoal(Goals.KUPIT_VIEW);
      else if (p === '/download') trackGoal(Goals.DOWNLOAD_CLICK);
      else if (isLandingPath(p)) trackGoal(Goals.LANDING_VIEW, { path: p });
      else if (p.startsWith('/blog/') && p !== '/blog/') {
        // Pageview only; article_read goal fires from useScrollDepth at 50%.
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
}

const LANDING_PATHS = new Set([
  '/discord', '/tiktok', '/instagram', '/whatsapp', '/telegram', '/netflix',
  '/dlya-igr', '/dlya-igr/dota', '/dlya-igr/cs2', '/dlya-igr/valorant', '/dlya-igr/pubg',
  '/obhod-blokirovok', '/youtube-bez-reklamy', '/pri-blokirovkah', '/chatgpt',
]);

function isLandingPath(path: string): boolean {
  return LANDING_PATHS.has(path);
}

/**
 * Tracks scroll depth on the current route and fires SCROLL_50 / SCROLL_75 /
 * SCROLL_100 goals once per route. Optionally fires an extra goal (such as
 * ARTICLE_READ) at the 50 % milestone — useful on blog pages.
 */
export function useScrollDepth(opts?: { extraGoalAt50?: GoalName }): void {
  const location = useLocation();

  useEffect(() => {
    let fired50 = false;
    let fired75 = false;
    let fired100 = false;

    const handler = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      if (!fired50 && pct >= 50) {
        fired50 = true;
        trackGoal(Goals.SCROLL_50, { path: location.pathname });
        if (opts?.extraGoalAt50) trackGoal(opts.extraGoalAt50, { path: location.pathname });
      }
      if (!fired75 && pct >= 75) {
        fired75 = true;
        trackGoal(Goals.SCROLL_75, { path: location.pathname });
      }
      if (!fired100 && pct >= 95) {
        // 95% counts as "all the way" — last 5% is usually footer/whitespace.
        fired100 = true;
        trackGoal(Goals.SCROLL_100, { path: location.pathname });
      }
    };

    // Fire once on mount in case the page loads already scrolled (e.g. anchor link).
    handler();

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [location.pathname, opts?.extraGoalAt50]);
}
