import React, { useState, useEffect } from 'react';
import { Send, Youtube, Wifi, Globe, Signal, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { updateMeta } from '../utils/meta';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Locations: React.FC = () => {
  const { content } = useLanguage();
  const [userIP, setUserIP] = useState<string | null>(null);
  const [currentPing, setCurrentPing] = useState<Record<string, number>>({});

  useEffect(() => {
    updateMeta({
      title: 'Серверы VPN — 5 локаций по всему миру | BRAID VPN',
      description: 'Серверы BRAID VPN в 5 странах: Россия, Нидерланды, Армения, США, Финляндия. YouTube без рекламы через Армению/Нидерланды. Пинг от 22ms. 99.9% uptime.',
      path: '/locations',
      keywords: 'vpn серверы, vpn локации, vpn россия, vpn нидерланды, vpn сша, vpn армения',
    });
  }, []);

  // Simulate ping updates
  useEffect(() => {
    const updatePings = () => {
      const newPings: Record<string, number> = {};
      content.locations.list.forEach((loc) => {
        const basePing = parseInt(loc.ping.replace(/[^0-9]/g, ''));
        const variation = Math.floor(Math.random() * 10) - 5;
        newPings[loc.country] = Math.max(5, basePing + variation);
      });
      setCurrentPing(newPings);
    };

    updatePings();
    const interval = setInterval(updatePings, 3000);
    return () => clearInterval(interval);
  }, [content.locations.list]);

  // Try to get user's IP
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP(null));
  }, []);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-green-400 font-medium">Все серверы онлайн</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
            {content.locations.header}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            {content.locations.subtext}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Locations List */}
          <div className="space-y-3 sm:space-y-4">
            {content.locations.list.map((loc, i) => (
              <div
                key={i}
                className="glass-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={`https://flagcdn.com/w80/${loc.flag}.png`}
                      alt={loc.country}
                      className="w-8 h-6 sm:w-10 sm:h-7 object-cover rounded"
                    />
                    {/* Online indicator */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#05050A]">
                      <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h3 className="text-white font-bold text-sm sm:text-base">{loc.country}</h3>
                      <span className="text-gray-500 text-xs sm:text-sm">/ {loc.city}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 line-clamp-1">{loc.use}</p>
                    {loc.badge && (
                      <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded ${
                        loc.badge.includes('YOUTUBE')
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {loc.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3 h-3 text-green-500" />
                    <span className="text-xs sm:text-sm font-mono text-green-400 tabular-nums">
                      {currentPing[loc.country] || parseInt(loc.ping.replace(/[^0-9]/g, ''))}ms
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">ONLINE</span>
                </div>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="space-y-4 sm:space-y-6">

            {/* User IP Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Ваше подключение</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Текущий IP-адрес</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-3 sm:p-4 font-mono">
                {userIP ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm sm:text-base">{userIP}</span>
                    <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Не защищён</span>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">Определение...</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Подключитесь к VPN, чтобы скрыть ваш реальный IP и защитить данные
              </p>
            </div>

            {/* YouTube без рекламы */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">YouTube без рекламы</h3>
                  <p className="text-red-400 text-xs sm:text-sm">Нидерланды или Армения</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Подключившись к серверу в Нидерландах или Армении, вы сможете смотреть YouTube
                без рекламы. Это работает автоматически — никаких расширений или
                дополнительных настроек не требуется.
              </p>
            </div>

            {/* Russia - Works during blocks */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Работает при блокировках</h3>
                  <p className="text-orange-400 text-xs sm:text-sm">Сервер в России 🇷🇺</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Наши серверы в России работают даже при ограничениях сотовой связи,
                когда оператор блокирует интернет. Используем протокол VLESS + Reality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-primary">5</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Локаций</div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Uptime</div>
              </div>
              <div className="glass-panel p-4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-accent">10</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Гбит/с</div>
              </div>
            </div>

            {/* CTA */}
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="primary" className="w-full text-base sm:text-lg py-3 sm:py-4">
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                Подключиться сейчас
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
