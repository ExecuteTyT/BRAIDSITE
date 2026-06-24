import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import { tgBotUrl } from '../utils/telegram';

const TELEGRAM_BOT_URL = tgBotUrl('footer');

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-[#05050A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10 mb-16">
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
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><NavLink to="/technology" className="hover:text-brand-primary transition-colors">{content.nav.technology}</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-brand-primary transition-colors">{content.nav.pricing}</NavLink></li>
              <li><NavLink to="/locations" className="hover:text-brand-primary transition-colors">{content.nav.locations}</NavLink></li>
              <li><NavLink to="/download" className="hover:text-brand-primary transition-colors">{content.nav.download}</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-brand-primary transition-colors">{content.nav.blog}</NavLink></li>
              <li><NavLink to="/besplatnyy-vpn" className="hover:text-brand-primary transition-colors">Бесплатный VPN</NavLink></li>
              <li><NavLink to="/luchshiy-vpn-2026" className="hover:text-brand-primary transition-colors">Лучший VPN 2026</NavLink></li>
              <li><NavLink to="/kupit-vpn" className="hover:text-brand-primary transition-colors">Купить VPN</NavLink></li>
              <li><NavLink to="/kupit-klyuch-vpn" className="hover:text-brand-primary transition-colors">Купить ключ VPN</NavLink></li>
            </ul>
          </div>

          {/* Скачать */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Скачать
            </h3>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><NavLink to="/skachat-vpn" className="hover:text-brand-primary transition-colors">Скачать VPN</NavLink></li>
              <li><NavLink to="/skachat-vpn-na-pk" className="hover:text-brand-primary transition-colors">Скачать на ПК</NavLink></li>
              <li><NavLink to="/skachat-vpn-na-android" className="hover:text-brand-primary transition-colors">Скачать на Android</NavLink></li>
              <li><NavLink to="/skachat-vpn-na-ayfon" className="hover:text-brand-primary transition-colors">Скачать на iPhone</NavLink></li>
              <li><NavLink to="/vpn-dlya-brauzera" className="hover:text-brand-primary transition-colors">VPN для браузера</NavLink></li>
              <li><NavLink to="/vpn-na-telefon" className="hover:text-brand-primary transition-colors">VPN на телефон</NavLink></li>
              <li><NavLink to="/russkiy-vpn" className="hover:text-brand-primary transition-colors">Русский VPN</NavLink></li>
            </ul>
          </div>

          {/* Сервисы */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Сервисы
            </h3>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><NavLink to="/youtube-bez-reklamy" className="hover:text-brand-primary transition-colors">YouTube без рекламы</NavLink></li>
              <li><NavLink to="/roblox" className="hover:text-brand-primary transition-colors">VPN для Roblox</NavLink></li>
              <li><NavLink to="/chatgpt" className="hover:text-brand-primary transition-colors">VPN для ChatGPT</NavLink></li>
              <li><NavLink to="/discord" className="hover:text-brand-primary transition-colors">VPN для Discord</NavLink></li>
              <li><NavLink to="/steam" className="hover:text-brand-primary transition-colors">VPN для Steam</NavLink></li>
              <li><NavLink to="/telegram" className="hover:text-brand-primary transition-colors">VPN для Telegram</NavLink></li>
              <li><NavLink to="/instagram" className="hover:text-brand-primary transition-colors">VPN для Instagram</NavLink></li>
              <li><NavLink to="/netflix" className="hover:text-brand-primary transition-colors">VPN для Netflix</NavLink></li>
            </ul>
          </div>

          {/* Игры и операторы */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Игры и операторы
            </h3>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><NavLink to="/dlya-igr" className="hover:text-brand-primary transition-colors">VPN для игр</NavLink></li>
              <li><NavLink to="/dlya-igr/cs2" className="hover:text-brand-primary transition-colors">VPN для CS2</NavLink></li>
              <li><NavLink to="/dlya-igr/minecraft" className="hover:text-brand-primary transition-colors">VPN для Minecraft</NavLink></li>
              <li><NavLink to="/vpn-dlya-mts" className="hover:text-brand-primary transition-colors">VPN для МТС</NavLink></li>
              <li><NavLink to="/vpn-dlya-megafon" className="hover:text-brand-primary transition-colors">VPN для МегаФон</NavLink></li>
              <li><NavLink to="/pri-blokirovkah" className="hover:text-brand-primary transition-colors">При блокировках связи</NavLink></li>
              <li><NavLink to="/obhod-blokirovok" className="hover:text-brand-primary transition-colors">Обход блокировок РКН</NavLink></li>
            </ul>
          </div>

          {/* Платформы */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-6">
              Платформы
            </h3>
            <ul className="space-y-2.5 text-gray-400 text-sm">
              <li><NavLink to="/android" className="hover:text-brand-primary transition-colors">VPN для Android</NavLink></li>
              <li><NavLink to="/ios" className="hover:text-brand-primary transition-colors">VPN для iPhone</NavLink></li>
              <li><NavLink to="/windows" className="hover:text-brand-primary transition-colors">VPN для Windows</NavLink></li>
              <li><NavLink to="/mac" className="hover:text-brand-primary transition-colors">VPN для macOS</NavLink></li>
              <li><NavLink to="/vpn-dlya-kompyutera" className="hover:text-brand-primary transition-colors">VPN для компьютера</NavLink></li>
              <li><NavLink to="/technology" className="hover:text-brand-primary transition-colors">{content.nav.technology}</NavLink></li>
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
