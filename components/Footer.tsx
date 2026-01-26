import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-[#05050A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-white">BRAID VPN</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              {content.footer.desc}
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 hover:bg-brand-primary/30 border border-brand-primary/40 rounded-lg text-brand-primary font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              {content.footer.telegram}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">
              {content.footer.explore}
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <NavLink to="/technology" className="hover:text-brand-primary transition-colors">
                  {content.nav.technology}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className="hover:text-brand-primary transition-colors">
                  {content.nav.pricing}
                </NavLink>
              </li>
              <li>
                <NavLink to="/locations" className="hover:text-brand-primary transition-colors">
                  {content.nav.locations}
                </NavLink>
              </li>
              <li>
                <NavLink to="/download" className="hover:text-brand-primary transition-colors">
                  {content.nav.download}
                </NavLink>
              </li>
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
