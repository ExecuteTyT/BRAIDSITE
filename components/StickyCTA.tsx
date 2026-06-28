import React from 'react';
import { Send, X } from 'lucide-react';
import { Button } from './Button';
import { tgBotUrl } from '../utils/telegram';

// Sticky bottom CTA that slides in after the user scrolls — lifts conversion of
// content/landing traffic (esp. mobile) toward the Telegram bot. Dismissible
// per session. Click is auto-tracked as telegram_click via the global delegation
// in utils/telegramTracking (it's a t.me/braidvpn_bot link).
export const StickyCTA: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try { if (sessionStorage.getItem('sticky-cta-dismissed')) { setDismissed(true); return; } } catch { /* noop */ }
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div className={`fixed bottom-0 inset-x-0 z-40 pointer-events-none transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="mx-auto max-w-3xl m-3 sm:m-4 pointer-events-auto">
        <div className="glass-panel rounded-2xl border border-brand-primary/30 bg-[#0A0A12]/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,122,255,0.25)] flex items-center gap-3 p-3 sm:p-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm sm:text-base font-semibold text-white">7 дней бесплатно, без карты</div>
            <div className="text-xs text-gray-400 hidden sm:block">Ключ в Telegram за 30 секунд · до 5 устройств</div>
          </div>
          <a href={tgBotUrl('sticky_cta')} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <Button variant="primary" className="text-sm px-4 sm:px-6 py-2.5 whitespace-nowrap">
              <Send className="w-4 h-4" />Получить ключ
            </Button>
          </a>
          <button
            onClick={() => { try { sessionStorage.setItem('sticky-cta-dismissed', '1'); } catch { /* noop */ } setDismissed(true); }}
            className="flex-shrink-0 text-gray-500 hover:text-white p-1"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
