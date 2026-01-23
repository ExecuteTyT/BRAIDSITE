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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'glass-panel border-b border-white/5 bg-[#05050A]/90 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 relative z-[60]">
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

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden relative z-[60]">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-primary"
            >
              <Send className="w-5 h-5" />
            </a>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[55] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-[#0A0A0F] z-[60] transition-transform duration-300 ease-out md:hidden flex flex-col pt-20 px-6 overflow-y-auto border-l border-white/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button in menu */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Background Elements */}
        <div className="absolute top-1/4 left-0 w-40 h-40 bg-brand-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-brand-accent/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col gap-4 relative z-10 mt-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-display font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                  isActive
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-white hover:bg-white/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto mb-6 relative z-10"
          onClick={() => setIsOpen(false)}
        >
          <Button variant="primary" className="w-full text-base py-4">
            <Send className="w-5 h-5" />
            {content.nav.start}
          </Button>
        </a>
      </div>
    </nav>
  );
};
