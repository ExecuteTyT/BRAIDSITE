import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-[#05050A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.svg" alt="BRAID VPN" className="w-8 h-8" />
              <span className="font-display font-bold text-xl tracking-widest text-white">BRAID VPN</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 text-sm">
              {content.footer.desc}
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 hover:bg-brand-primary/30 border border-brand-primary/40 rounded-lg text-brand-primary font-medium transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              {content.footer.telegram}
            </a>
          </div>

          {/* Продукт */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Продукт
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><NavLink to="/technology" className="hover:text-brand-primary transition-colors">{content.nav.technology}</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-brand-primary transition-colors">{content.nav.pricing}</NavLink></li>
              <li><NavLink to="/locations" className="hover:text-brand-primary transition-colors">{content.nav.locations}</NavLink></li>
              <li><NavLink to="/download" className="hover:text-brand-primary transition-colors">{content.nav.download}</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-brand-primary transition-colors">{content.nav.blog}</NavLink></li>
            </ul>
          </div>

          {/* Решения */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Решения
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><NavLink to="/youtube-bez-reklamy" className="hover:text-brand-primary transition-colors">YouTube без рекламы</NavLink></li>
              <li><NavLink to="/pri-blokirovkah" className="hover:text-brand-primary transition-colors">При блокировках связи</NavLink></li>
              <li><NavLink to="/chatgpt" className="hover:text-brand-primary transition-colors">VPN для ChatGPT</NavLink></li>
            </ul>
          </div>

          {/* Платформы */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Платформы
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><NavLink to="/android" className="hover:text-brand-primary transition-colors">VPN для Android</NavLink></li>
              <li><NavLink to="/ios" className="hover:text-brand-primary transition-colors">VPN для iPhone</NavLink></li>
              <li><NavLink to="/windows" className="hover:text-brand-primary transition-colors">VPN для Windows</NavLink></li>
              <li><NavLink to="/mac" className="hover:text-brand-primary transition-colors">VPN для macOS</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2026 BRAID VPN. {content.footer.rights}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>{content.footer.design}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
