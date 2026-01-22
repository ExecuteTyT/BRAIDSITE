import React from 'react';
import { MapPin, Send, Youtube, Wifi, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Locations: React.FC = () => {
  const { content } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.locations.header}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {content.locations.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Locations List */}
          <div className="space-y-4">
            {content.locations.list.map((loc, i) => (
              <div
                key={i}
                className={`glass-panel p-6 rounded-xl flex items-center justify-between group transition-all duration-300 ${
                  loc.special
                    ? 'border-brand-primary/50 hover:border-brand-primary bg-brand-primary/5'
                    : 'hover:border-brand-primary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    loc.special ? 'bg-brand-primary/20' : 'bg-white/5'
                  }`}>
                    {loc.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">{loc.country}</h3>
                      <span className="text-gray-500 font-normal text-sm">/ {loc.city}</span>
                      {loc.badge && (
                        <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary text-xs font-bold rounded">
                          {loc.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{loc.use}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg">
                    {loc.ping}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {/* Russia Special */}
            <div className="glass-panel p-8 rounded-3xl border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">YouTube без рекламы</h3>
                  <p className="text-green-400 text-sm">Только на российском сервере</p>
                </div>
              </div>
              <p className="text-gray-400">
                Подключившись к нашему серверу в России, вы сможете смотреть YouTube
                без рекламы. Это работает автоматически — никаких расширений или
                дополнительных настроек не требуется.
              </p>
            </div>

            {/* Works during blocks */}
            <div className="glass-panel p-8 rounded-3xl border-orange-500/30 bg-orange-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Работает при блокировках</h3>
                  <p className="text-orange-400 text-sm">Даже когда другие VPN не работают</p>
                </div>
              </div>
              <p className="text-gray-400">
                Наши серверы в России работают даже при ограничениях сотовой связи,
                когда оператор блокирует интернет в некоторых частях города.
                Используем продвинутый протокол VLESS + Reality.
              </p>
            </div>

            {/* Map Visualization */}
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-brand-primary" />
                <h3 className="text-lg font-bold text-white">Глобальное покрытие</h3>
              </div>

              {/* Simplified Map SVG */}
              <div className="relative h-[200px] w-full flex items-center justify-center">
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
                  {/* Dots for locations */}
                  <circle cx="200" cy="80" r="6" fill="#007AFF" className="animate-pulse" /> {/* Russia */}
                  <circle cx="100" cy="90" r="4" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '0.5s'}} /> {/* Netherlands */}
                  <circle cx="80" cy="100" r="4" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '1s'}} /> {/* USA */}
                  <circle cx="130" cy="75" r="4" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '1.5s'}} /> {/* Finland */}
                  <circle cx="170" cy="100" r="4" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '2s'}} /> {/* Armenia */}

                  {/* Connecting lines */}
                  <path d="M200 80 Q 150 60 100 90" stroke="url(#lineGrad)" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M200 80 Q 140 70 80 100" stroke="url(#lineGrad)" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M200 80 Q 165 70 130 75" stroke="url(#lineGrad)" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M200 80 Q 185 90 170 100" stroke="url(#lineGrad)" strokeWidth="1" fill="none" opacity="0.5" />

                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#007AFF" stopOpacity="0" />
                      <stop offset="50%" stopColor="#007AFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-widest">{content.locations.scanning}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="primary" className="w-full text-lg py-4">
                <Send className="w-5 h-5" />
                Подключиться сейчас
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
