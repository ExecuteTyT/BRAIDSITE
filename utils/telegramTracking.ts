// Утилита для отслеживания переходов в Telegram через Яндекс.Метрику

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
  }
}

const YANDEX_METRIKA_ID = 106436554;

/**
 * Отслеживает клик по ссылке Telegram с указанием места клика
 */
export const trackTelegramClick = (buttonLocation: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    try {
      // Отправляем событие в Яндекс.Метрику
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', 'telegram_click', {
        location: buttonLocation,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
      
      // Также отправляем как внешнюю ссылку
      window.ym(YANDEX_METRIKA_ID, 'extLink', 'https://t.me/braidvpn_bot', {
        location: buttonLocation
      });
    } catch (error) {
      console.error('Yandex Metrika tracking error:', error);
    }
  }
};

/**
 * Добавляет обработчик клика на ссылку Telegram
 */
export const addTelegramTracking = (element: HTMLElement | null, location: string) => {
  if (!element) return;
  
  element.addEventListener('click', (e) => {
    trackTelegramClick(location);
  });
};

/**
 * Инициализирует отслеживание всех ссылок на Telegram на странице
 */
export const initTelegramTracking = () => {
  if (typeof window === 'undefined') return;
  
  // Найти все ссылки на Telegram
  const telegramLinks = document.querySelectorAll('a[href*="t.me/braidvpn_bot"]');
  
  telegramLinks.forEach((link, index) => {
    // Определить место клика по классам или тексту
    let location = 'unknown';
    
    const href = link.getAttribute('href') || '';
    const className = link.className || '';
    const text = link.textContent || '';
    
    // Определение места по классам
    if (className.includes('cta') || className.includes('button')) {
      if (text.includes('Получить') || text.includes('ключ')) {
        location = 'cta_get_key';
      } else if (text.includes('Попробовать') || text.includes('бесплатн')) {
        location = 'cta_try_free';
      } else if (text.includes('Поддержка') || text.includes('Telegram')) {
        location = 'support_link';
      } else {
        location = 'cta_button';
      }
    } else if (className.includes('nav') || className.includes('navbar')) {
      location = 'navbar';
    } else if (link.closest('footer')) {
      location = 'footer';
    } else if (link.closest('article') || link.closest('.article')) {
      location = 'article';
    } else {
      location = `link_${index}`;
    }
    
    // Добавить обработчик
    link.addEventListener('click', () => {
      trackTelegramClick(location);
    });
  });
};
