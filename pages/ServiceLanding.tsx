import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Send, ArrowRight, Check, X, AlertCircle, Sparkles, Shield, Zap, Wifi, Globe, Lock,
  Smartphone, Monitor, Youtube, MessageSquare, Music, Film, Gamepad2, ShoppingCart, Heart, Mail, Users,
  Clock, Server, Layers, TrendingUp, Star, BookOpen,
} from 'lucide-react';
import { Button } from '../components/Button';
import type { LandingConfig } from '../data/landings/types';
import { articleBySlug } from '../data/blog';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';
const SITE_URL = 'https://braidpro.tech';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  send: Send, sparkles: Sparkles, shield: Shield, zap: Zap, wifi: Wifi, globe: Globe, lock: Lock,
  smartphone: Smartphone, monitor: Monitor, youtube: Youtube, message: MessageSquare,
  music: Music, film: Film, gamepad: Gamepad2, cart: ShoppingCart, heart: Heart, mail: Mail,
  users: Users, clock: Clock, server: Server, layers: Layers, trending: TrendingUp, star: Star,
  book: BookOpen, alert: AlertCircle,
};

const renderIcon = (name: string | undefined, className: string) => {
  if (!name) return null;
  const Comp = iconMap[name.toLowerCase()] ?? Sparkles;
  return <Comp className={className} />;
};

export const ServiceLanding: React.FC<{ config: LandingConfig }> = ({ config }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${config.title} | BRAID VPN`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', config.metaDescription);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', config.keywords.join(', '));
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${config.path}`);

    // FAQPage JSON-LD
    document.querySelector('script[data-landing-jsonld]')?.remove();
    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.setAttribute('data-landing-jsonld', 'true');
    jsonLd.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: config.breadcrumb, item: `${SITE_URL}${config.path}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faq.items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ]);
    document.head.appendChild(jsonLd);

    return () => {
      document.querySelector('script[data-landing-jsonld]')?.remove();
    };
  }, [config]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-brand-accent/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            {renderIcon(config.hero.badgeIcon, 'w-4 h-4 text-brand-primary')}
            <span className="text-xs sm:text-sm text-brand-primary font-medium">{config.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
            {config.hero.h1}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-10">
            {config.hero.lead}
          </p>

          {config.hero.bullets && (
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              {config.hero.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                  <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 group">
              <Send className="w-5 h-5" />
              {config.hero.primaryCta ?? 'Получить ключ за 30 секунд'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">7 дней бесплатно • Без карты • До 5 устройств</p>
        </div>

        {config.stats && (
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16">
            {config.stats.map((s, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 sm:p-6 text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-primary mb-1">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pain */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 text-center">
            {config.pain.h2}
          </h2>
          {config.pain.intro && (
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 text-center">
              {config.pain.intro}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {config.pain.items.map((item, i) => (
              <div key={i} className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6 border-red-500/20 hover:border-red-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 text-center">
            {config.solution.h2}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-10 sm:mb-14 text-center">
            {config.solution.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {config.solution.benefits.map((b, i) => (
              <div key={i} className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-brand-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  {renderIcon(b.icon, 'w-6 h-6 text-brand-primary')}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 text-center">
            {config.howItWorks.h2}
          </h2>
          {config.howItWorks.intro && (
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-10 sm:mb-14 text-center">
              {config.howItWorks.intro}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {config.howItWorks.steps.map((step, i) => (
              <div key={i} className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6 relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 mt-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 py-3.5 sm:py-4">
                <Send className="w-5 h-5" />
                Начать с бесплатных 7 дней
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Comparison */}
      {config.comparison && (
        <section className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-8 sm:mb-12 text-center">
              {config.comparison.h2}
            </h2>
            <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-white font-semibold">Параметр</th>
                      {config.comparison.headers.map((h, i) => (
                        <th key={i} className={`text-left px-4 sm:px-6 py-3 sm:py-4 font-semibold ${i === 0 ? 'text-brand-primary' : 'text-gray-300'}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.comparison.rows.map((row, i) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-medium">{row.param}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-white">{row.ours}</td>
                        {row.others.map((cell, j) => (
                          <td key={j} className="px-4 sm:px-6 py-3 sm:py-4 text-gray-500">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-8 sm:mb-12 text-center">
            {config.faq.h2}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {config.faq.items.map((item, i) => (
              <details key={i} className="glass-panel rounded-xl group">
                <summary className="px-5 sm:px-6 py-4 sm:py-5 cursor-pointer flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-white">
                  {item.q}
                  <ArrowRight className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm text-gray-400 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SEO block */}
      {config.seoBlock && (
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
              {config.seoBlock.h2}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {config.seoBlock.paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-gray-400 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {(config.relatedLandings?.length || config.relatedArticles?.length) ? (
        <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 sm:mb-8 text-center">
              Связанные материалы
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.relatedLandings?.map((rel, i) => (
                <NavLink
                  key={`l-${i}`}
                  to={rel.path}
                  className="glass-panel rounded-xl p-5 hover:border-brand-primary/40 transition-colors group"
                >
                  <div className="text-xs text-brand-primary font-semibold mb-1">Лендинг</div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-primary transition-colors mb-1.5">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{rel.desc}</p>
                </NavLink>
              ))}
              {config.relatedArticles?.map(slug => {
                const a = articleBySlug(slug);
                if (!a) return null;
                return (
                  <NavLink
                    key={`a-${slug}`}
                    to={`/blog/${slug}`}
                    className="glass-panel rounded-xl p-5 hover:border-brand-primary/40 transition-colors group"
                  >
                    <div className="text-xs text-brand-primary font-semibold mb-1">Статья • {a.category}</div>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-primary transition-colors mb-1.5">
                      {a.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{a.excerpt}</p>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">
            Готовы попробовать?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10">
            7 дней полного доступа без оплаты. До 5 устройств. Все локации. Протокол VLESS Reality — обходит блокировки РКН.
          </p>
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 group">
              <Send className="w-5 h-5" />
              Получить бесплатный ключ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
