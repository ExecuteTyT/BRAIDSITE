import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Globe } from 'lucide-react';
import { Button } from './Button';
import { NavItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content, language, toggleLanguage } = useLanguage();

  const NAV_ITEMS: NavItem[] = [
    { label: content.nav.technology, path: '/technology' },
    { label: content.nav.pricing, path: '/pricing' },
    { label: content.nav.locations, path: '/locations' },
    { label: content.nav.blog, path: '/blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-colors group"
            >
               <Globe className="w-4 h-4 text-gray-400 group-hover:text-white" />
               <span className={`text-xs font-bold ${language === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
               <span className="text-gray-600">/</span>
               <span className={`text-xs font-bold ${language === 'ru' ? 'text-white' : 'text-gray-500'}`}>RU</span>
            </button>

            <Button variant="primary" className="!py-2 !px-6 text-sm">
              {content.nav.connect}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded border border-white/10"
            >
               <span className={`text-xs font-bold ${language === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
               <span className="text-gray-600">/</span>
               <span className={`text-xs font-bold ${language === 'ru' ? 'text-white' : 'text-gray-500'}`}>RU</span>
            </button>
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
        <Button variant="primary" className="mt-8">
          {content.nav.start}
        </Button>
      </div>
    </nav>
  );
};