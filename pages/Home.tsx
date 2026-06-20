import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeroCanvas } from '../components/HeroCanvas';
import { Button } from '../components/Button';
import { Shield, Globe, Zap, Smartphone, Lock, Download, Youtube, Wifi, Send, ArrowRight, Check, Star, Instagram, ChevronDown, ChevronUp, MessageSquare, Film, Gamepad2, ShoppingCart, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { articles } from '../data/blog';
import { applySeo } from '../utils/meta';

import { tgBotUrl } from '../utils/telegram';

const TELEGRAM_BOT_URL = tgBotUrl('home');

const HOME_TITLE = 'BRAID VPN — Скачать ВПН для России 2026 бесплатно | YouTube, ChatGPT, обход блокировок';
const HOME_DESC = 'Скачать BRAID VPN для России 2026: на ПК, Android, iPhone. Бесплатно 7 дней без карты. YouTube без рекламы, ChatGPT, Discord, обход блокировок РКН. Протокол VLESS Reality, от 163₽/мес.';

// FAQ Accordion Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden border border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
      >
        <span className="text-sm sm:text-base font-medium text-white pr-4 group-hover:text-brand-primary transition-colors">
          {question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { content } = useLanguage();

  React.useEffect(() => {
    applySeo({
      title: HOME_TITLE,
      description: HOME_DESC,
      path: '/',
      keywords: ['впн', 'vpn', 'скачать впн', 'бесплатный впн', 'vpn для россии', 'лучший впн 2026', 'впн на пк', 'впн для андроид', 'рабочий впн', 'русский впн'],
    });
  }, []);

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

        <div className="container mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm text-brand-primary font-medium">{content.hero.badge}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="text-white">{content.hero.title_prefix}</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                {content.hero.title_suffix}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-400 mb-3 sm:mb-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {content.hero.subtitle_1}
              <span className="text-white font-medium"> {content.hero.subtitle_2}</span>
            </p>
            <p className="text-sm sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              {content.hero.subtitle_3}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-center lg:items-start">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto cta-pulse group text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4">
                  <Send className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                  {content.hero.cta_primary}
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <NavLink to="/download" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4" icon={<Download size={18}/>}>
                  {content.hero.cta_secondary}
                </Button>
              </NavLink>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
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

          <div className="order-1 lg:order-2 flex justify-center relative mb-8 lg:mb-0">
            {/* Abstract Sphere Representation */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full border border-brand-primary/30 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-brand-accent/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-full blur-2xl"></div>

              {/* Floating Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 sm:p-6 glass-panel rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-float">
                <div className="text-2xl sm:text-4xl font-bold font-display text-white mb-1">0ms</div>
                <div className="text-[10px] sm:text-xs text-brand-primary uppercase tracking-widest">{content.hero.latency}</div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-[10px] sm:text-xs text-green-400 font-medium animate-float" style={{animationDelay: '1s'}}>
                YouTube без рекламы
              </div>
              <div className="absolute -bottom-2 -left-2 sm:bottom-12 sm:left-0 px-2 sm:px-3 py-1 bg-brand-primary/20 border border-brand-primary/40 rounded-full text-[10px] sm:text-xs text-brand-primary font-medium animate-float" style={{animationDelay: '2s'}}>
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
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
            Почему <span className="text-brand-primary">BRAID VPN</span> — лучший VPN для России в 2026 году
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
            Уникальные преимущества, которых нет у других VPN-сервисов
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* YouTube без рекламы */}
          <NavLink to="/youtube-bez-reklamy" className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-green-500/50 transition-all duration-500 block">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-green-500/10 rounded-full blur-[60px] group-hover:bg-green-500/20 transition-all duration-700"></div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 bg-green-500/20 rounded text-[10px] sm:text-xs text-green-400 font-bold">ЭКСКЛЮЗИВ</div>
            <Youtube className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 sm:mb-3">YouTube без рекламы — автоматически</h3>
            <p className="text-sm sm:text-base text-gray-400">Подключитесь к серверу в Армении или Нидерландах и смотрите YouTube без рекламы. Работает автоматически — никаких расширений или дополнительных настроек.</p>
            <span className="text-brand-primary text-sm mt-3 inline-block group-hover:underline">Узнать подробнее →</span>
          </NavLink>

          {/* Работает при блокировках */}
          <NavLink to="/pri-blokirovkah" className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/50 transition-all duration-500 block">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-[60px] group-hover:bg-orange-500/20 transition-all duration-700"></div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 bg-orange-500/20 rounded text-[10px] sm:text-xs text-orange-400 font-bold">УНИКАЛЬНО</div>
            <Wifi className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 sm:mb-3">Работает при блокировках связи оператором</h3>
            <p className="text-sm sm:text-base text-gray-400">Работает даже когда оператор (МТС, МегаФон, Билайн, Tele2) блокирует интернет. Протокол VLESS + Reality обходит ограничения сотовой связи.</p>
            <span className="text-brand-primary text-sm mt-3 inline-block group-hover:underline">Как это работает →</span>
          </NavLink>

          {/* Instagram */}
          <NavLink to="/pri-blokirovkah" className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500 block">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-pink-500/10 rounded-full blur-[60px] group-hover:bg-pink-500/20 transition-all duration-700"></div>
            <Instagram className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500 mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 sm:mb-3">{content.features.instagram.title}</h3>
            <p className="text-sm sm:text-base text-gray-400">{content.features.instagram.desc}</p>
            <span className="text-brand-primary text-sm mt-3 inline-block group-hover:underline">Подробнее →</span>
          </NavLink>

          {/* Обход блокировок */}
          <NavLink to="/technology" className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-brand-primary/50 transition-all duration-500 block">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-brand-primary/10 rounded-full blur-[60px] group-hover:bg-brand-primary/20 transition-all duration-700"></div>
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 sm:mb-3">{content.features.protocol.title}</h3>
            <p className="text-sm sm:text-base text-gray-400">{content.features.protocol.desc}</p>
            <span className="text-brand-primary text-sm mt-3 inline-block group-hover:underline">Узнать подробнее →</span>
          </NavLink>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-12 sm:py-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

          {/* Box 1: Speed */}
          <div className="sm:col-span-2 glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2">{content.features.speed.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{content.features.speed.desc}</p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-brand-accent flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              </div>
            </div>
          </div>

          {/* Box 2: Price */}
          <NavLink to="/pricing" className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-center hover:border-brand-primary/50 transition-colors cursor-pointer group block">
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-2">{content.features.price.label}</div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white group-hover:text-glow transition-all">
              {content.features.price.amount}
              <span className="text-base sm:text-xl text-gray-500 font-sans">{content.features.price.period}</span>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-400">при оплате за год</div>
          </NavLink>

          {/* Box 3: Locations */}
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-white">{content.features.locations.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">{content.features.locations.desc}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              {['🇷🇺', '🇺🇸', '🇳🇱', '🇦🇲', '🇫🇮'].map((flag, i) => (
                <span key={i} className="text-xl sm:text-2xl">{flag}</span>
              ))}
            </div>
          </div>

          {/* Box 4: Trial */}
          <div className="sm:col-span-2 glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">7 дней бесплатно</h3>
              <p className="text-sm sm:text-base text-gray-400">Протестируй все функции без оплаты. Без карты.</p>
            </div>
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto whitespace-nowrap">
                <Send className="w-4 h-4" />
                Попробовать
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 sm:mb-4">{content.steps.title}</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-10 sm:mb-16 max-w-2xl mx-auto px-2">
            Подключение занимает меньше минуты. Никаких сложных настроек.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: '01', title: content.steps.step1.title, desc: content.steps.step1.desc, icon: <Send size={24} className="sm:w-8 sm:h-8" /> },
              { step: '02', title: content.steps.step2.title, desc: content.steps.step2.desc, icon: <Download size={24} className="sm:w-8 sm:h-8" /> },
              { step: '03', title: content.steps.step3.title, desc: content.steps.step3.desc, icon: <Zap size={24} className="sm:w-8 sm:h-8" /> },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4 sm:mb-6 group-hover:border-brand-primary/50 group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
                  <span className="text-gray-300">{item.icon}</span>
                </div>
                <div className="text-4xl sm:text-6xl font-display font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 px-4 sm:px-0">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:mt-12 px-4">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                Начать сейчас
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">{content.pricing.table.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pl-4 text-gray-500 font-normal">{content.pricing.table.col_feature}</th>
                  <th className="py-4 text-white font-bold text-center">BRAID VPN</th>
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

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
              {content.faq.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
              Ответы на самые популярные вопросы о VPN
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {content.faq.items.map((item, index) => (
              <FAQItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid — internal linking hub for SEO */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
            Решения BRAID VPN для любых задач
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
            Подберите VPN под ваш сервис, игру или платформу. Все решения работают на одном ключе — 7 дней бесплатно.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { to: '/youtube-bez-reklamy', icon: Youtube, label: 'YouTube без рекламы', color: 'text-green-400', bg: 'bg-green-500/10' },
            { to: '/chatgpt', icon: Sparkles, label: 'VPN для ChatGPT', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
            { to: '/discord', icon: MessageSquare, label: 'VPN для Discord', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { to: '/instagram', icon: Instagram, label: 'VPN для Instagram', color: 'text-pink-400', bg: 'bg-pink-500/10' },
            { to: '/tiktok', icon: Film, label: 'VPN для TikTok', color: 'text-rose-400', bg: 'bg-rose-500/10' },
            { to: '/telegram', icon: Send, label: 'VPN для Telegram', color: 'text-sky-400', bg: 'bg-sky-500/10' },
            { to: '/whatsapp', icon: MessageSquare, label: 'VPN для WhatsApp', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { to: '/netflix', icon: Film, label: 'VPN для Netflix', color: 'text-red-400', bg: 'bg-red-500/10' },
            { to: '/dlya-igr', icon: Gamepad2, label: 'VPN для игр', color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { to: '/pri-blokirovkah', icon: Wifi, label: 'При блокировках связи', color: 'text-orange-400', bg: 'bg-orange-500/10' },
            { to: '/obhod-blokirovok', icon: Shield, label: 'Обход блокировок РКН', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { to: '/besplatno', icon: Star, label: 'Бесплатный VPN', color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-brand-primary/40 transition-all group flex flex-col items-center text-center"
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Latest Articles for SEO + UX */}
      {articles.length > 0 && (
        <section className="py-12 sm:py-20 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-4">
                <BookOpen className="w-4 h-4 text-brand-primary" />
                <span className="text-xs sm:text-sm text-brand-primary font-medium">Полезные статьи</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
                Всё, что нужно знать о VPN в России 2026
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
                Инструкции, обзоры, сравнения протоколов и решения для конкретных сервисов
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {articles.slice(0, 6).map((post) => (
                <NavLink
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-brand-primary/40 transition-all group"
                >
                  <div className="text-[10px] sm:text-xs text-brand-primary font-semibold uppercase tracking-wider mb-2">
                    {post.category} • {post.readTime}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-3">{post.excerpt}</p>
                  <span className="text-xs sm:text-sm text-brand-primary font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">
                    Читать <ArrowRight className="w-3 h-3" />
                  </span>
                </NavLink>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <NavLink to="/blog">
                <Button variant="secondary" className="text-sm sm:text-base px-6 py-3">
                  Все статьи блога ({articles.length})
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </NavLink>
            </div>
          </div>
        </section>
      )}

      {/* Extended SEO content block */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 sm:mb-8">
            VPN для России 2026: ваш надёжный доступ ко всему интернету
          </h2>

          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-400 leading-relaxed">
            <p>
              В 2026 году выбор VPN для России — это уже не вопрос «нужен ли», а вопрос «какой выберу». Заблокирован Instagram,
              недоступен ChatGPT, замедлен YouTube и Discord, отключён Netflix. Без VPN современный интернет работает на четверть.
              А обычные международные сервисы — NordVPN, ExpressVPN, Surfshark — не справляются: их протоколы OpenVPN и WireGuard
              детектируются DPI Роскомнадзора и блокируются. Нужен другой подход.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">Что даёт BRAID VPN</h3>
            <p>
              Мы используем протокол <strong className="text-white">VLESS + Reality</strong> — самый продвинутый VPN-протокол на 2026 год.
              Он маскирует трафик под обычное HTTPS-соединение к microsoft.com или samsung.com — DPI не отличит наш VPN от обычного веб-сёрфинга.
              Это значит: <NavLink to="/youtube-bez-reklamy" className="text-brand-primary hover:underline">YouTube без рекламы</NavLink>,
              работающий <NavLink to="/discord" className="text-brand-primary hover:underline">Discord</NavLink>,
              открытый <NavLink to="/instagram" className="text-brand-primary hover:underline">Instagram</NavLink>,
              быстрый <NavLink to="/chatgpt" className="text-brand-primary hover:underline">ChatGPT</NavLink>,
              стабильный <NavLink to="/telegram" className="text-brand-primary hover:underline">Telegram</NavLink> —
              всё это включается за 30 секунд после подключения.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">5 локаций: одна подписка — весь мир</h3>
            <p>
              <strong className="text-white">Россия (Москва)</strong> — низкий пинг 15ms, работает при ограничениях оператора связи
              (МТС, МегаФон, Билайн, Tele2). Идеально для <NavLink to="/whatsapp" className="text-brand-primary hover:underline">WhatsApp</NavLink>{' '}
              и Telegram. <strong className="text-white">Армения (Ереван)</strong> — YouTube без рекламы, низкий пинг, отлично для
              стриминга и социальных сетей. <strong className="text-white">Нидерланды (Амстердам)</strong> — европейский контент,
              <NavLink to="/netflix" className="text-brand-primary hover:underline"> Netflix EU</NavLink>, оптимально для Discord (~45ms).
              <strong className="text-white"> США (Нью-Йорк)</strong> — ChatGPT, Netflix US, доступ к американским сервисам.
              <strong className="text-white"> Финляндия (Хельсинки)</strong> — идеальный игровой сервер с пингом 30ms до EU West,
              лучше всего для <NavLink to="/dlya-igr" className="text-brand-primary hover:underline">онлайн-игр</NavLink>{' '}
              (<NavLink to="/dlya-igr/cs2" className="text-brand-primary hover:underline">CS2</NavLink>,{' '}
              <NavLink to="/dlya-igr/dota" className="text-brand-primary hover:underline">Dota 2</NavLink>,{' '}
              <NavLink to="/dlya-igr/valorant" className="text-brand-primary hover:underline">Valorant</NavLink>).
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">Совместимо со всеми устройствами</h3>
            <p>
              Один ключ — до 5 устройств одновременно. <NavLink to="/android" className="text-brand-primary hover:underline">VPN для Android</NavLink>{' '}
              (Samsung, Xiaomi, Huawei, Honor), <NavLink to="/ios" className="text-brand-primary hover:underline">VPN для iPhone и iPad</NavLink>{' '}
              (iOS 15+), <NavLink to="/windows" className="text-brand-primary hover:underline">VPN для Windows</NavLink>{' '}
              (Windows 10/11), <NavLink to="/mac" className="text-brand-primary hover:underline">VPN для macOS</NavLink>{' '}
              (Intel и Apple Silicon). Установка через приложение Happ — никаких сложных настроек,
              никаких системных прав.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">Цена и оплата</h3>
            <p>
              Самый выгодный тариф — годовой за <strong className="text-white">1 958₽</strong> (163₽/мес).
              Это в 5 раз дешевле NordVPN и в 3 раза дешевле российских конкурентов. Оплата картой РФ (Сбер, Тинькофф, Альфа, ВТБ),
              СБП или криптовалютой. Без автосписаний — платите, когда хотите.
              <NavLink to="/besplatno" className="text-brand-primary hover:underline"> Первые 7 дней — бесплатно</NavLink> без привязки карты.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">Безопасность и приватность</h3>
            <p>
              TLS 1.3 шифрование, политика отсутствия логов, защита от DNS-утечек, kill-switch в приложении.
              Мы не храним истории посещений, не передаём данные третьим лицам, не показываем рекламу.
              <NavLink to="/technology" className="text-brand-primary hover:underline"> Подробнее о технологии VLESS Reality</NavLink>.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-white mt-6">Кому подходит BRAID VPN</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Тем, кто хочет смотреть <strong className="text-white">YouTube без рекламы</strong> и без подписки Premium</li>
              <li>Геймерам, которым нужен <strong className="text-white">низкий пинг</strong> до EU/NA серверов</li>
              <li>Пользователям при <strong className="text-white">блокировках сотовой связи</strong> в определённых районах</li>
              <li>Разработчикам и креаторам, использующим <strong className="text-white">ChatGPT, Claude, Gemini</strong></li>
              <li>Любителям зарубежного контента — <strong className="text-white">Netflix, HBO, Disney+</strong></li>
              <li>Стримерам, которым важна <strong className="text-white">защита от DDoS-атак</strong></li>
              <li>Тем, кто хочет <strong className="text-white">безопасно подключаться к публичному Wi-Fi</strong> в кафе и аэропортах</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-32 container mx-auto px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-brand-primary/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

        <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-3 sm:mb-4 relative z-10 px-2">
          {content.cta_bottom.title}
        </h2>
        <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8 relative z-10 px-2">
          {content.cta_bottom.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 px-4">
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 cta-pulse">
              <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              {content.cta_bottom.button}
            </Button>
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 relative z-10 px-2">
          <div className="flex items-center gap-2">
            <Check className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
            Без карты
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
            Возврат 7 дней
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
            Поддержка 24/7
          </div>
        </div>
      </section>
    </div>
  );
};
