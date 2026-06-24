import React from 'react';
import { Send } from 'lucide-react';
import { trackGoal, trackExtLink, Goals } from '../utils/analytics';

const PROXY_URL = 'https://t.me/proxy?server=braid-proxy.pro&port=8443&secret=eed6be9227f18285119a37e72d03211b7262726169642d70726f78792e70726f';

export const TelegramProxyHint: React.FC<{ className?: string; location?: string }> = ({ className = '', location = 'hint' }) => (
  <p className={`text-xs text-gray-500 ${className}`}>
    <Send className="w-3 h-3 inline mr-1 -mt-0.5" />
    Не открывается Telegram?{' '}
    <a
      href={PROXY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackGoal(Goals.PROXY_CLICK, { location });
        trackExtLink(PROXY_URL, { location });
      }}
      className="text-brand-primary hover:underline font-medium"
    >
      Подключите бесплатный прокси
    </a>
  </p>
);
