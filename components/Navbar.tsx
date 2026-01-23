import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Send } from 'lucide-react';
import { Button } from './Button';
import { NavItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useLanguage();

  const NAV_ITEMS: NavItem[] = [
    { label: content.nav.technology, path: '/technology' },
    { label: content.nav.pricing, path: '/pricing' },
    { label: content.nav.locations, path: '/locations' },
    { label: content.nav.blog, path: '/blog' },
    { label: content.nav.download, path: '/download' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || isOpen ? 'glass-panel border-b border-white/5 bg-[#05050A]/90 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 relative z-50">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-white">BRAID</span>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-wider font-medium transition-colors ${
                      isActive ? 'text-brand-primary drop-shadow-[0_0_8px_rgba(0,122,255,0.8)]' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="!py-2 !px-6 text-sm group">
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  {content.nav.connect}
                </Button>
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <div className="flex items-center gap-3 md:hidden relative z-50">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-primary active:scale-95 transition-transform"
              >
                <Send className="w-5 h-5" />
              </a>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white active:scale-95 transition-transform touch-manipulation"
                onClick={toggleMenu}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Rendered outside nav for better z-index control */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-[9998] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-out Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-[#0A0A0F] z-[9999] md:hidden flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-display font-bold text-lg text-white">Меню</span>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white active:scale-95 transition-transform touch-manipulation"
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Background Glow Effects */}
          <div className="absolute top-1/4 left-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 relative">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-lg font-display font-bold uppercase tracking-wider py-4 px-4 rounded-xl transition-all active:scale-[0.98] ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/10 border border-brand-primary/30'
                      : 'text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Menu Footer CTA */}
        <div className="p-4 border-t border-white/10">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="block"
          >
            <Button variant="primary" className="w-full text-base py-4">
              <Send className="w-5 h-5" />
              {content.nav.start}
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};
