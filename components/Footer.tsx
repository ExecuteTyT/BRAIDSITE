import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  return (
    <footer className="border-t border-white/5 bg-[#05050A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-2xl font-bold tracking-widest text-white mb-6">BRAID</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              {content.footer.desc}
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">{content.footer.explore}</h3>
            <ul className="space-y-4 text-gray-400">
              <li><NavLink to="/technology" className="hover:text-brand-primary transition-colors">{content.nav.technology}</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-brand-primary transition-colors">{content.nav.pricing}</NavLink></li>
              <li><NavLink to="/locations" className="hover:text-brand-primary transition-colors">{content.nav.locations}</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-brand-primary transition-colors">{content.nav.blog}</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-6">{content.footer.legal}</h3>
            <ul className="space-y-4 text-gray-400">
              <li><NavLink to="/legal" className="hover:text-brand-primary transition-colors">{content.footer.privacy}</NavLink></li>
              <li><NavLink to="/legal" className="hover:text-brand-primary transition-colors">{content.footer.terms}</NavLink></li>
              <li><NavLink to="/legal" className="hover:text-brand-primary transition-colors">{content.footer.refund}</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2024 BRAID VPN. {content.footer.rights}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>{content.footer.design}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};