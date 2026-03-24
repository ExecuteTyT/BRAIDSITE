import React from 'react';
import { Send } from 'lucide-react';

const PROXY_URL = 'https://t.me/proxy?server=proxy.braidx.tech&port=443&secret=65423350e35d0b60aaff270d542f00dd';

export const TelegramProxyHint: React.FC<{ className?: string }> = ({ className = '' }) => (
  <p className={`text-xs text-gray-500 ${className}`}>
    <Send className="w-3 h-3 inline mr-1 -mt-0.5" />
    Не открывается Telegram?{' '}
    <a
      href={PROXY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-primary hover:underline font-medium"
    >
      Подключите бесплатный прокси
    </a>
  </p>
);
