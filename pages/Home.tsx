import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeroCanvas } from '../components/HeroCanvas';
import { Button } from '../components/Button';
import { Shield, Globe, Zap, Smartphone, Lock, Download, Youtube, Wifi, Send, ArrowRight, Check, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Home: React.FC = () => {
  const { content } = useLanguage();

  const brands = [
    { name: 'YouTube 4K', opacity: 0.8 },
    { name: 'Netflix', opacity: 0.6 },
    { name: 'ChatGPT', opacity: 0.7 },
    { name: 'Instagram', opacity: 0.6 },
    { name: 'Spotify', opacity: 0.7 },
    { name: 'Twitch', opacity: 0.6 },
    { name: 'Discord', opacity: 0.8 },
    { name: 'Telegram', opacity: 0.7 },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <HeroCanvas />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-brand-primary font-medium">{content.hero.badge}</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">{content.hero.title_prefix}</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                {content.hero.title_suffix}
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-4 max-w-lg leading-relaxed">
              {content.hero.subtitle_1}
              <span className="text-white font-medium"> {content.hero.subtitle_2}</span>
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              {content.hero.subtitle_3}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full sm:w-auto cta-pulse group">
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  {content.hero.cta_primary}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <NavLink to="/download">
                <Button variant="secondary" className="w-full sm:w-auto" icon={<Download size={18}/>}>
                  {content.hero.cta_secondary}
                </Button>
              </NavLink>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span>4.9/5</span>
              </div>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>1000+ пользователей</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center relative">
            {/* Abstract Sphere Representation */}
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border border-brand-primary/30 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-brand-accent/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-full blur-2xl"></div>

              {/* Floating Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-6 glass-panel rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-float">
                <div className="text-4xl font-bold font-display text-white mb-1">0ms</div>
                <div className="text-xs text-brand-primary uppercase tracking-widest">{content.hero.latency}</div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-xs text-green-400 font-medium animate-float" style={{animationDelay: '1s'}}>
                YouTube без рекламы
              </div>
              <div className="absolute bottom-12 left-0 px-3 py-1 bg-brand-primary/20 border border-brand-primary/40 rounded-full text-xs text-brand-primary font-medium animate-float" style={{animationDelay: '2s'}}>
                Работает везде
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-sm py-6 overflow-hidden">
        <div className="flex w-[200%] animate-ticker hover:[animation-play-state:paused]">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-1 flex justify-center items-center px-12 min-w-[200px]">
              <span className="text-2xl font-display font-bold text-white/40 uppercase hover:text-white hover:text-glow transition-all cursor-default">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* USP Cards - Key Features */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Почему выбирают <span className="text-brand-primary">BRAID VPN</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Уникальные преимущества, которых нет у других VPN-сервисов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* YouTube без рекламы */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-green-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[60px] group-hover:bg-green-500/20 transition-all duration-700"></div>
            <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 rounded text-xs text-green-400 font-bold">ЭКСКЛЮЗИВ</div>
            <Youtube className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">{content.features.youtube.title}</h3>
            <p className="text-gray-400">{content.features.youtube.desc}</p>
          </div>

          {/* Работает при блокировках */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] group-hover:bg-orange-500/20 transition-all duration-700"></div>
            <div className="absolute top-4 right-4 px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-400 font-bold">УНИКАЛЬНО</div>
            <Wifi className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">{content.features.russia.title}</h3>
            <p className="text-gray-400">{content.features.russia.desc}</p>
          </div>

          {/* Обход блокировок */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-brand-primary/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[60px] group-hover:bg-brand-primary/20 transition-all duration-700"></div>
            <Shield className="w-12 h-12 text-brand-primary mb-6" />
            <h3 className="text-xl font-display font-bold text-white mb-3">{content.features.protocol.title}</h3>
            <p className="text-gray-400">{content.features.protocol.desc}</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[500px]">

          {/* Box 1: Speed */}
          <div className="md:col-span-2 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">{content.features.speed.title}</h3>
                <p className="text-gray-400">{content.features.speed.desc}</p>
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-brand-accent flex items-center justify-center">
                <Zap className="w-8 h-8 text-brand-accent" />
              </div>
            </div>
          </div>

          {/* Box 2: Price */}
          <div className="md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center hover:border-brand-primary/50 transition-colors cursor-pointer group">
            <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">{content.features.price.label}</div>
            <div className="text-5xl font-display font-bold text-white group-hover:text-glow transition-all">
              {content.features.price.amount}
              <span className="text-xl text-gray-500 font-sans">{content.features.price.period}</span>
            </div>
            <div className="mt-4 text-sm text-green-400">при оплате за год</div>
          </div>

          {/* Box 3: Locations */}
          <div className="md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 relative overflow-hidden">
            <Globe className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-bold text-white">{content.features.locations.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{content.features.locations.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['🇷🇺', '🇺🇸', '🇳🇱', '🇦🇲', '🇫🇮'].map((flag, i) => (
                <span key={i} className="text-2xl">{flag}</span>
              ))}
            </div>
          </div>

          {/* Box 4: Trial */}
          <div className="md:col-span-2 md:row-span-1 glass-panel rounded-3xl p-8 flex items-center justify-between relative overflow-hidden bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">7 дней бесплатно</h3>
              <p className="text-gray-400">Протестируй все функции без оплаты. Без карты.</p>
            </div>
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="whitespace-nowrap">
                <Send className="w-4 h-4" />
                Попробовать
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">{content.steps.title}</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
            Подключение занимает меньше минуты. Никаких сложных настроек.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: content.steps.step1.title, desc: content.steps.step1.desc, icon: <Send size={32} /> },
              { step: '02', title: content.steps.step2.title, desc: content.steps.step2.desc, icon: <Download size={32} /> },
              { step: '03', title: content.steps.step3.title, desc: content.steps.step3.desc, icon: <Zap size={32} /> },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-6 group-hover:border-brand-primary/50 group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
                  <span className="text-gray-300">{item.icon}</span>
                </div>
                <div className="text-6xl font-display font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-12">
            <Button variant="primary" className="text-lg px-8">
              <Send className="w-5 h-5" />
              Начать сейчас
            </Button>
          </a>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">{content.pricing.table.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pl-4 text-gray-500 font-normal">{content.pricing.table.col_feature}</th>
                  <th className="py-4 text-white font-bold text-center">BRAID</th>
                  <th className="py-4 text-gray-500 font-normal text-center">{content.pricing.table.col_regular}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {content.pricing.table.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 pl-4 text-gray-300">{row.name}</td>
                    <td className="py-4 text-center">
                      <span className="text-brand-primary font-bold flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" />
                        {row.braid}
                      </span>
                    </td>
                    <td className="py-4 text-center text-gray-500">{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 container mx-auto px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 relative z-10">
          {content.cta_bottom.title}
        </h2>
        <p className="text-xl text-gray-400 mb-8 relative z-10">
          {content.cta_bottom.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-lg px-12 py-4 cta-pulse">
              <Send className="w-5 h-5" />
              {content.cta_bottom.button}
            </Button>
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500 relative z-10">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Без карты
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Возврат 7 дней
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Поддержка 24/7
          </div>
        </div>
      </section>
    </div>
  );
};
