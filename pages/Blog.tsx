import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Send, Shield, Search, Gamepad2, Zap, Scale, Smartphone, Globe, Youtube, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { articles } from '../data/blog';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Гайд': Shield,
  'Лайфхак': Zap,
  'Игры': Gamepad2,
  'Технологии': Search,
  'Обзор': Scale,
  'Инструкция': Smartphone,
  'Сервисы': Youtube,
  'Сравнение': Scale,
  'География': Globe,
  'Безопасность': Shield,
  'Мессенджеры': MessageSquare,
};

const POPULAR_TOPICS = [
  'VPN для России',
  'Обход блокировок РКН',
  'YouTube без рекламы',
  'VLESS Reality',
  'VPN для игр',
  'VPN для Discord',
  'VPN для ChatGPT',
  'VPN для Android',
  'VPN для iPhone',
  'VPN для Windows',
  'Бесплатный VPN',
  'Купить VPN',
];

export const Blog: React.FC = () => {
  const { content } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => set.add(a.category));
    return Array.from(set).sort();
  }, []);

  const visible = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-4 sm:mb-6">
            <BookOpen className="w-4 h-4 text-brand-primary" />
            <span className="text-xs sm:text-sm text-brand-primary font-medium">Блог BRAID VPN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
            {content.blog.header}
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-2">
            {content.blog.subtext}
          </p>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                !activeCategory ? 'bg-brand-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Все статьи ({articles.length})
            </button>
            {categories.map(cat => {
              const count = articles.filter(a => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    activeCategory === cat ? 'bg-brand-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {visible.map((post) => {
            const Icon = categoryIcons[post.category] ?? Shield;
            return (
              <NavLink key={post.slug} to={`/blog/${post.slug}`} className="block">
                <article className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden group hover:border-brand-primary/50 transition-all duration-300 h-full">
                  <div className="h-36 sm:h-48 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                    <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-brand-primary/60 group-hover:text-brand-primary transition-colors" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-semibold text-white border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
                      <Clock className="w-3 h-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="flex items-center gap-2 text-brand-primary text-xs sm:text-sm font-medium group-hover:gap-3 transition-all">
                      Читать статью
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </article>
              </NavLink>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
            О чём мы пишем
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
              В блоге BRAID VPN мы рассказываем о технологиях защиты приватности в интернете,
              способах обхода блокировок Роскомнадзора, сравнении VPN-протоколов и практических
              советах по настройке VPN на разных устройствах.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
              Наши эксперты регулярно публикуют актуальные материалы о работе VPN при
              ограничениях операторов связи, настройке безопасного соединения для онлайн-игр
              с минимальным пингом, а также об уникальных возможностях — например, как
              смотреть YouTube без рекламы через сервер в Армении или Нидерландах.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Все статьи написаны простым языком и содержат пошаговые инструкции,
              которые помогут даже начинающим пользователям настроить VPN и защитить
              свои данные в интернете. Сейчас в блоге <strong className="text-white">{articles.length}</strong>{' '}
              статей, и список постоянно пополняется.
            </p>
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-display font-bold text-white mb-4 sm:mb-6 text-center">
            Популярные темы
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {POPULAR_TOPICS.map((topic, i) => (
              <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-gray-400">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center px-2">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4">
            Хотите попробовать лучший VPN для России?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            7 дней бесплатно. Без карты. До 5 устройств.
          </p>
          <div className="flex justify-center">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                Получить бесплатный ключ
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
