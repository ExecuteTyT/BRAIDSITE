import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const PROXY_URL = 'https://t.me/proxy?server=proxy.braidx.tech&port=443&secret=65423350e35d0b60aaff270d542f00dd';
const STORAGE_KEY = 'tg-proxy-banner-dismissed';

export const TelegramProxyBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--banner-height', visible ? '40px' : '0px');
    return () => { document.documentElement.style.setProperty('--banner-height', '0px'); };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Send className="w-4 h-4 text-white/90 flex-shrink-0 hidden sm:block" />
          <p className="text-sm text-white/95 truncate">
            <span className="hidden sm:inline">Telegram заблокирован? </span>
            <span className="font-semibold">Бесплатный прокси для Telegram</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={PROXY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-md hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Подключить
          </a>
          <button
            onClick={dismiss}
            className="p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
