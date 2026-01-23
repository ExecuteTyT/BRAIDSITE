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
        scrolled || isOpen ? 'glass-panel border-b border-white/5 bg-[#05050A]/80' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 z-50">
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
          <div className="flex items-center gap-4 md:hidden z-50">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-primary/20 text-brand-primary text-sm font-medium"
            >
              <Send className="w-4 h-4" />
            </a>
            <button
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#05050A] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
         {/* Background Elements */}
         <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-2xl font-display font-bold uppercase tracking-widest ${
                isActive ? 'text-brand-primary' : 'text-white'
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
          className="mt-8"
        >
          <Button variant="primary" className="text-lg">
            <Send className="w-5 h-5 mr-2" />
            {content.nav.start}
          </Button>
        </a>
      </div>
    </nav>
  );
};
