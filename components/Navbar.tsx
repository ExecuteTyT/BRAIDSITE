import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Send, ChevronDown, Youtube, Wifi, Globe, Smartphone, Monitor, Laptop, Shield, ArrowRight, Download, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

/* ───────── Dropdown item data ───────── */

const SOLUTIONS = [
  {
    to: '/youtube-bez-reklamy',
    icon: Youtube,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    hoverBorder: 'group-hover/card:border-green-500/40',
    badge: 'ХИТ',
    badgeColor: 'bg-green-500/20 text-green-400',
    title: 'YouTube без рекламы',
    desc: 'Смотрите видео без рекламы через серверы в Армении и Нидерландах',
  },
  {
    to: '/pri-blokirovkah',
    icon: Wifi,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    hoverBorder: 'group-hover/card:border-orange-500/40',
    badge: 'УТП',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    title: 'При блокировках связи',
    desc: 'Работает когда оператор отключает интернет в вашем районе',
  },
  {
    to: '/chatgpt',
    icon: Sparkles,
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    hoverBorder: 'group-hover/card:border-brand-primary/40',
    badge: '2026',
    badgeColor: 'bg-brand-primary/20 text-brand-primary',
    title: 'VPN для ChatGPT',
    desc: 'Доступ к ChatGPT из России через сервер в США за 2 минуты',
  },
];

const PLATFORMS = [
  { to: '/android', icon: Smartphone, label: 'Android', desc: 'Samsung, Xiaomi, Huawei', color: 'text-green-400' },
  { to: '/ios', icon: Globe, label: 'iPhone / iPad', desc: 'iOS 15+, App Store', color: 'text-gray-200' },
  { to: '/windows', icon: Monitor, label: 'Windows', desc: 'Windows 10 / 11', color: 'text-blue-400' },
  { to: '/mac', icon: Laptop, label: 'macOS', desc: 'MacBook, iMac', color: 'text-purple-400' },
];

/* ───────── Desktop dropdown wrapper ───────── */

const DesktopDropdown: React.FC<{
  label: string;
  isActive: boolean;
  children: React.ReactNode;
  wide?: boolean;
}> = ({ label, isActive, children, wide }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors outline-none ${
          isActive
            ? 'text-brand-primary drop-shadow-[0_0_8px_rgba(0,122,255,0.8)]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel */}
      <div
        className={`absolute top-full pt-3 transition-all duration-200 ${
          wide ? 'left-1/2 -translate-x-1/2' : 'left-0'
        } ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div
          className={`rounded-2xl border border-white/[0.08] bg-[#0C0C14]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden ${
            wide ? 'w-[600px]' : 'w-[280px]'
          }`}
        >
          {/* Accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
          <div className="p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────── Mobile accordion ───────── */

const MobileAccordion: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 px-4 text-left"
      >
        <span className="font-display font-bold text-base uppercase tracking-wider text-white">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

/* ───────── MAIN NAVBAR ───────── */

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isSolutionActive = ['/youtube-bez-reklamy', '/pri-blokirovkah', '/chatgpt'].includes(location.pathname);
  const isPlatformActive = ['/android', '/ios', '/windows', '/mac', '/download'].includes(location.pathname);

  return (
    <>
      {/* ──────── Desktop + Mobile Bar ──────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-[#05050A]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2.5 relative z-50 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,122,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,122,255,0.5)] transition-shadow">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-white">BRAID</span>
            </NavLink>

            {/* ──── Desktop Nav ──── */}
            <div className="hidden lg:flex items-center">
              {/* Решения dropdown */}
              <DesktopDropdown label="Решения" isActive={isSolutionActive} wide>
                <div className="grid grid-cols-1 gap-0.5">
                  {SOLUTIONS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="group/card flex items-start gap-4 p-3 rounded-xl border border-transparent hover:bg-white/[0.03] transition-all duration-200"
                    >
                      <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 ${item.hoverBorder} border border-transparent transition-colors`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-[13px] text-white group-hover/card:text-brand-primary transition-colors">{item.title}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.badgeColor}`}>{item.badge}</span>
                        </div>
                        <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover/card:text-brand-primary group-hover/card:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                    </NavLink>
                  ))}
                </div>

                {/* Bottom promo strip */}
                <div className="mt-1 mx-1 mb-1 p-3 rounded-xl bg-gradient-to-r from-brand-primary/[0.06] to-brand-accent/[0.06] border border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-primary" />
                    <span className="text-[12px] text-gray-400">Протокол <span className="text-white font-medium">VLESS + Reality</span> — невидим для DPI</span>
                  </div>
                  <NavLink to="/technology" className="text-[11px] text-brand-primary hover:underline font-medium whitespace-nowrap ml-3">Подробнее</NavLink>
                </div>
              </DesktopDropdown>

              {/* Платформы dropdown */}
              <DesktopDropdown label="Платформы" isActive={isPlatformActive}>
                <div className="grid grid-cols-1 gap-0.5">
                  {PLATFORMS.map((p) => (
                    <NavLink
                      key={p.to}
                      to={p.to}
                      className="group/card flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover/card:border-brand-primary/30 transition-colors">
                        <p.icon className={`w-[18px] h-[18px] ${p.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[13px] text-white group-hover/card:text-brand-primary transition-colors">{p.label}</div>
                        <div className="text-[11px] text-gray-500">{p.desc}</div>
                      </div>
                    </NavLink>
                  ))}
                </div>
                {/* Download all */}
                <div className="mt-1 border-t border-white/[0.04] pt-1">
                  <NavLink
                    to="/download"
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/[0.04] transition-all group/dl"
                  >
                    <Download className="w-4 h-4 text-gray-500 group-hover/dl:text-brand-primary transition-colors" />
                    <span className="text-[13px] text-gray-400 group-hover/dl:text-white transition-colors font-medium">Все приложения</span>
                  </NavLink>
                </div>
              </DesktopDropdown>

              {/* Flat links */}
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    isActive ? 'text-brand-primary drop-shadow-[0_0_8px_rgba(0,122,255,0.8)]' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {content.nav.pricing}
              </NavLink>

              <NavLink
                to="/locations"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    isActive ? 'text-brand-primary drop-shadow-[0_0_8px_rgba(0,122,255,0.8)]' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {content.nav.locations}
              </NavLink>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    isActive ? 'text-brand-primary drop-shadow-[0_0_8px_rgba(0,122,255,0.8)]' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {content.nav.blog}
              </NavLink>

              {/* CTA */}
              <div className="ml-3">
                <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="!py-2.5 !px-6 text-sm group">
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    {content.nav.connect}
                  </Button>
                </a>
              </div>
            </div>

            {/* ──── Mobile Toggle ──── */}
            <div className="flex items-center gap-3 lg:hidden relative z-50">
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
                onClick={() => setIsOpen(v => !v)}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ──────── Mobile Overlay ──────── */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ──────── Mobile Slide-out Menu ──────── */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[88vw] max-w-[380px] bg-[#08080E] z-[9999] lg:hidden flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-white">BRAID</span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white active:scale-95 transition-transform touch-manipulation"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть меню"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Glow decorations */}
          <div className="absolute top-1/4 left-0 w-40 h-40 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            {/* Решения */}
            <MobileAccordion title="Решения" defaultOpen>
              <div className="space-y-1">
                {SOLUTIONS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 p-3 rounded-xl transition-all active:scale-[0.98] ${
                        isActive ? 'bg-brand-primary/10 border border-brand-primary/20' : 'border border-transparent hover:bg-white/[0.03]'
                      }`
                    }
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{item.title}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${item.badgeColor}`}>{item.badge}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </MobileAccordion>

            {/* Платформы */}
            <MobileAccordion title="Платформы">
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p) => (
                  <NavLink
                    key={p.to}
                    to={p.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex flex-col items-center gap-2 p-3.5 rounded-xl text-center transition-all active:scale-[0.97] ${
                        isActive ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08]'
                      }`
                    }
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                      <p.icon className={`w-5 h-5 ${p.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{p.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{p.desc}</div>
                    </div>
                  </NavLink>
                ))}
              </div>
              <NavLink
                to="/download"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white transition-colors active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Все приложения</span>
              </NavLink>
            </MobileAccordion>

            {/* Flat links */}
            <div className="border-b border-white/5">
              {[
                { to: '/pricing', label: content.nav.pricing },
                { to: '/locations', label: content.nav.locations },
                { to: '/technology', label: content.nav.technology },
                { to: '/blog', label: content.nav.blog },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-4 text-base font-display font-bold uppercase tracking-wider transition-all active:scale-[0.98] ${
                      isActive ? 'text-brand-primary' : 'text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer CTA */}
        <div className="p-4 border-t border-white/[0.06] bg-[#08080E]">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            <Button variant="primary" className="w-full text-base py-4">
              <Send className="w-5 h-5" />
              {content.nav.start}
            </Button>
          </a>
          <p className="text-center text-[11px] text-gray-600 mt-3">7 дней бесплатно • Без привязки карты</p>
        </div>
      </div>
    </>
  );
};
