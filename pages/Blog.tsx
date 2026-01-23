import React from 'react';
import { BookOpen, Clock, ArrowRight, Send, Shield, Search, Gamepad2, Zap, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

const blogIcons = [Shield, Search, Gamepad2, Zap, Scale];

export const Blog: React.FC = () => {
  const { content } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            <BookOpen className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary font-medium">Блог BRAID VPN</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.blog.header}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {content.blog.subtext}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {content.blog.posts.map((post, index) => {
            const IconComponent = blogIcons[index % blogIcons.length];
            return (
              <article
                key={index}
                className="glass-panel rounded-2xl overflow-hidden group hover:border-brand-primary/50 transition-all duration-300"
              >
                {/* Article Header */}
                <div className="h-48 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                  <IconComponent className="w-16 h-16 text-brand-primary/60 group-hover:text-brand-primary transition-colors" />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-brand-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Читать статью
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* SEO Content Section */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-6">
            О чём мы пишем
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 leading-relaxed mb-4">
              В блоге BRAID VPN мы рассказываем о технологиях защиты приватности в интернете,
              способах обхода блокировок в России, сравнении VPN-протоколов и практических
              советах по настройке VPN на разных устройствах.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Наши эксперты регулярно публикуют актуальные материалы о работе VPN при
              ограничениях операторов связи, настройке безопасного соединения для онлайн-игр
              с минимальным пингом, а также об уникальных возможностях — например, как
              смотреть YouTube без рекламы через сервер в Нидерландах.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Все статьи написаны простым языком и содержат пошаговые инструкции,
              которые помогут даже начинающим пользователям настроить VPN и защитить
              свои данные в интернете.
            </p>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-16">
          <h2 className="text-xl font-display font-bold text-white mb-6 text-center">
            Популярные темы
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'VPN для России',
              'Обход блокировок РКН',
              'YouTube без рекламы',
              'VLESS протокол',
              'VPN для игр',
              'Сравнение VPN',
              'Приватность в интернете',
              'Настройка VPN',
              'Лучший VPN 2024',
              'VPN для iPhone',
              'VPN для Android',
              'VPN для Windows'
            ].map((topic, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white/5 hover:bg-brand-primary/20 border border-white/10 hover:border-brand-primary/30 rounded-full text-sm text-gray-400 hover:text-brand-primary transition-all cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Хотите попробовать лучший VPN для России?
          </h3>
          <p className="text-gray-400 mb-8">
            7 дней бесплатно. Без карты. До 5 устройств.
          </p>
          <div className="flex justify-center">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-lg px-8">
                <Send className="w-5 h-5" />
                Получить бесплатный ключ
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
