import React from 'react';
import { ShieldCheck, EyeOff, Zap, Youtube, Wifi, Send, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Technology: React.FC = () => {
  const { content } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary font-medium">Продвинутые технологии</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {content.technology.header}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {content.technology.subtext}
          </p>
        </div>

        {/* Core Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">

          {/* VLESS Card */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border-l-4 border-l-brand-primary">
            <ShieldCheck className="w-16 h-16 text-brand-primary mb-6" />
            <h2 className="text-2xl font-display font-bold text-white mb-4">{content.technology.vless.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {content.technology.vless.desc}
            </p>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 border border-white/10">
              <div className="mb-2 text-gray-500">{content.technology.vless.sim}</div>
              <div>{content.technology.vless.sim_detail}<span className="text-brand-primary">PASS</span></div>
            </div>
          </div>

          {/* No Logs Card */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl border-l-4 border-l-brand-accent">
            <EyeOff className="w-16 h-16 text-brand-accent mb-6" />
            <h2 className="text-2xl font-display font-bold text-white mb-4">{content.technology.ram.title}</h2>
            <p className="text-gray-400 leading-relaxed">
              {content.technology.ram.desc}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-full bg-red-500 animate-[ticker_2s_linear_infinite]"></div>
              </div>
              <span className="text-xs text-red-500 uppercase font-bold">{content.technology.ram.purge}</span>
            </div>
          </div>
        </div>

        {/* Unique Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* YouTube без рекламы */}
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-green-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Youtube className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <div className="text-xs text-green-400 uppercase tracking-wider font-bold mb-1">Эксклюзив</div>
                <h3 className="text-xl font-bold text-white">{content.features.youtube.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{content.features.youtube.desc}</p>
            <ul className="space-y-2">
              {['Работает автоматически', 'Не нужны расширения', 'Подключись к Нидерландам'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Работает при блокировках */}
          <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-orange-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Wifi className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <div className="text-xs text-orange-400 uppercase tracking-wider font-bold mb-1">Уникально</div>
                <h3 className="text-xl font-bold text-white">{content.features.russia.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{content.features.russia.desc}</p>
            <ul className="space-y-2">
              {['Обход ограничений операторов', 'Работает при отключении связи', 'Протокол VLESS + Reality'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Low Latency Section */}
        <div className="glass-panel rounded-3xl overflow-hidden relative min-h-[400px] flex items-center mb-16">
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">{content.technology.gaming.title}</h2>
              <ul className="space-y-4">
                {content.technology.gaming.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_5px_cyan]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0A0A0F] border border-white/10 rounded-xl p-6 shadow-2xl">
              <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                <span className="text-gray-400 text-sm">{content.technology.gaming.ping_test}</span>
                <span className="text-green-400 font-mono">{content.technology.gaming.live}</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Москва → YouTube CDN</span>
                  <span className="text-white">8ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Москва → Discord</span>
                  <span className="text-white">15ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Амстердам → Netflix CDN</span>
                  <span className="text-white">12ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Нью-Йорк → ChatGPT API</span>
                  <span className="text-white">24ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Готовы попробовать?
          </h3>
          <p className="text-gray-400 mb-8">
            7 дней бесплатно. Без карты. Без обязательств.
          </p>
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-lg px-8">
              <Send className="w-5 h-5" />
              Получить бесплатный ключ
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
