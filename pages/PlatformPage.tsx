import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Send, ArrowRight, Check, Download, ChevronDown, ChevronUp } from 'lucide-react';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden border border-white/5">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors group">
        <h3 className="text-sm sm:text-base font-medium text-white pr-4 group-hover:text-brand-primary transition-colors">{question}</h3>
        <div className="flex-shrink-0">{isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}</div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

interface PlatformConfig {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  downloadUrl: string;
  downloadLabel: string;
  features: string[];
  steps: string[];
  compatibility?: string[];
  faq: { q: string; a: string }[];
  accentColor: string;
}

const platforms: Record<string, PlatformConfig> = {
  android: {
    slug: 'android',
    title: 'Android',
    h1: 'VPN для Android — Скачать бесплатно на телефон',
    metaTitle: 'VPN для Android — Скачать бесплатно на телефон на русском языке',
    metaDesc: 'Скачайте BRAID VPN для Android бесплатно. Работает на всех телефонах (Samsung, Xiaomi, Huawei). YouTube без рекламы, обход блокировок. 7 дней бесплатно.',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.happproxy',
    downloadLabel: 'Скачать VPN для Android из Google Play',
    accentColor: 'green',
    features: [
      'YouTube без рекламы на телефоне',
      'Работает на Samsung, Xiaomi, Huawei, Honor',
      'Обход блокировок Discord, ChatGPT, Instagram',
      'Быстрая скорость — смотрите видео в 4K',
      'На русском языке',
      'Бесплатно 7 дней',
    ],
    steps: [
      'Скачайте приложение Happ из Google Play',
      'Получите VPN-ключ в Telegram-боте @braidvpn_bot',
      'Откройте приложение, нажмите «Добавить конфигурацию»',
      'Вставьте ключ и нажмите «Подключить»',
      'Выберите сервер (Армения для YouTube, США для ChatGPT)',
    ],
    compatibility: [
      'Samsung Galaxy (S, A, M серии)',
      'Xiaomi (Redmi, Poco, Mi)',
      'Huawei, Honor',
      'Realme, Oppo, Vivo',
      'Google Pixel',
      'OnePlus, Motorola и другие',
    ],
    faq: [
      { q: 'Бесплатный ли VPN для Android?', a: 'Первые 7 дней — полностью бесплатно. Потом от 163₽/месяц.' },
      { q: 'Работает ли на Xiaomi/Huawei?', a: 'Да, BRAID VPN работает на всех Android-телефонах, включая Xiaomi, Huawei, Honor, Samsung и другие.' },
    ],
  },
  ios: {
    slug: 'ios',
    title: 'iOS',
    h1: 'VPN для iPhone и iPad — Скачать бесплатно',
    metaTitle: 'VPN для iPhone — Скачать бесплатно VPN для iOS на русском',
    metaDesc: 'Скачайте BRAID VPN для iPhone и iPad бесплатно. YouTube без рекламы, обход блокировок. Протокол VLESS + Reality. 7 дней бесплатно, от 163₽/мес.',
    downloadUrl: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    downloadLabel: 'Скачать VPN для iPhone из App Store',
    accentColor: 'blue',
    features: [
      'YouTube без рекламы на iPhone и iPad',
      'Обход блокировок Discord, ChatGPT, Instagram',
      'Работает при блокировках связи',
      'Скорость до 10 Гбит/с',
      'На русском языке',
      'Бесплатно 7 дней',
    ],
    steps: [
      'Скачайте приложение Happ из App Store',
      'Получите VPN-ключ в Telegram-боте @braidvpn_bot',
      'Откройте приложение и добавьте конфигурацию',
      'Вставьте ключ и подключитесь',
      'Выберите сервер для своих задач',
    ],
    compatibility: [
      'iPhone (все модели от iPhone 8)',
      'iPad (все модели с iOS 15+)',
      'iPod Touch',
    ],
    faq: [
      { q: 'Бесплатный ли VPN для iPhone?', a: 'Первые 7 дней — полностью бесплатно. Потом от 163₽/месяц при годовой подписке.' },
      { q: 'Работает ли на iPad?', a: 'Да, BRAID VPN работает на всех iPad с iOS 15 и выше.' },
    ],
  },
  windows: {
    slug: 'windows',
    title: 'Windows',
    h1: 'VPN для Windows — Скачать бесплатно для компьютера',
    metaTitle: 'VPN для Windows 10/11 — Скачать бесплатно VPN для ПК',
    metaDesc: 'Скачайте BRAID VPN для Windows бесплатно. Работает на Windows 10 и 11. YouTube без рекламы, обход блокировок РКН. 7 дней бесплатно, от 163₽/мес.',
    downloadUrl: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
    downloadLabel: 'Скачать VPN для Windows (.exe)',
    accentColor: 'blue',
    features: [
      'YouTube без рекламы на компьютере',
      'Обход блокировок Discord, ChatGPT, Instagram',
      'Работает на Windows 10 и Windows 11',
      'Скорость до 10 Гбит/с — идеально для игр',
      'Низкий пинг для онлайн-игр',
      'Бесплатно 7 дней',
    ],
    steps: [
      'Скачайте установщик Happ для Windows',
      'Установите приложение (запустите .exe файл)',
      'Получите VPN-ключ в Telegram-боте @braidvpn_bot',
      'Откройте приложение и вставьте ключ',
      'Выберите сервер и подключитесь',
    ],
    compatibility: [
      'Windows 11 (все версии)',
      'Windows 10 (64-bit)',
      'Windows 7 (ограниченная поддержка)',
    ],
    faq: [
      { q: 'Бесплатный ли VPN для Windows?', a: 'Первые 7 дней — полностью бесплатно. Потом от 163₽/месяц.' },
      { q: 'Подходит ли для игр?', a: 'Да! BRAID VPN оптимизирован для онлайн-игр с низким пингом. Серверы в России (~15ms) и Финляндии (~40ms).' },
    ],
  },
  mac: {
    slug: 'mac',
    title: 'macOS',
    h1: 'VPN для macOS — Скачать бесплатно для MacBook',
    metaTitle: 'VPN для Mac — Скачать бесплатно VPN для macOS и MacBook',
    metaDesc: 'Скачайте BRAID VPN для macOS бесплатно. Работает на MacBook, iMac, Mac Mini. YouTube без рекламы, обход блокировок. 7 дней бесплатно, от 163₽/мес.',
    downloadUrl: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    downloadLabel: 'Скачать VPN для macOS из App Store',
    accentColor: 'purple',
    features: [
      'YouTube без рекламы на MacBook',
      'Обход блокировок Discord, ChatGPT, Instagram',
      'Работает на macOS Ventura, Sonoma и новее',
      'Скорость до 10 Гбит/с',
      'Нативное приложение для Apple Silicon',
      'Бесплатно 7 дней',
    ],
    steps: [
      'Скачайте приложение Happ из App Store',
      'Получите VPN-ключ в Telegram-боте @braidvpn_bot',
      'Откройте приложение и добавьте конфигурацию',
      'Вставьте ключ и подключитесь',
      'Выберите сервер для своих задач',
    ],
    compatibility: [
      'MacBook Air / MacBook Pro',
      'iMac, Mac Mini, Mac Studio',
      'Mac Pro',
      'macOS 13 (Ventura) и новее',
    ],
    faq: [
      { q: 'Бесплатный ли VPN для Mac?', a: 'Первые 7 дней — полностью бесплатно. Потом от 163₽/месяц при годовой подписке.' },
      { q: 'Работает ли на Apple Silicon (M1/M2/M3)?', a: 'Да, приложение нативно поддерживает процессоры Apple Silicon.' },
    ],
  },
};

export const PlatformPage: React.FC<{ platform: string }> = ({ platform }) => {
  const config = platforms[platform];

  React.useEffect(() => {
    if (!config) return;
    document.title = config.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', config.metaDesc);
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', `https://braidx.tech/${config.slug}`);
  }, [config]);

  if (!config) return <div className="pt-32 text-center text-white">Страница не найдена</div>;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-12">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">{config.h1}</h1>
          <div className="flex justify-center gap-4 mb-8 px-4 sm:px-0">
            <a href={config.downloadUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto text-sm sm:text-lg px-6 sm:px-8 py-4">
                <Download className="w-5 h-5" />
                {config.downloadLabel}
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-400">Или получите ключ в <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Telegram-боте</a> и установите вручную</p>
        </div>
      </section>

      {/* Возможности */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Возможности VPN для {config.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.features.map((f, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Инструкция */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Как установить VPN на {config.title} — Пошаговая инструкция</h2>
        <div className="space-y-4">
          {config.steps.map((s, i) => (
            <div key={i} className="glass-panel rounded-xl p-4 flex items-start gap-4">
              <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-bold text-sm flex-shrink-0">{i + 1}</div>
              <span className="text-gray-300 text-sm sm:text-base pt-1">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Совместимость */}
      {config.compatibility && (
        <section className="py-12 sm:py-20 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Совместимость с {config.title}-устройствами</h2>
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <p className="text-gray-400 mb-4">BRAID VPN работает на следующих устройствах:</p>
              <ul className="space-y-2">
                {config.compatibility.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Вопросы про VPN для {config.title}</h2>
        <div className="space-y-3">
          {config.faq.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 relative z-10">Скачайте VPN для {config.title} прямо сейчас</h2>
        <p className="text-base text-gray-400 mb-8 relative z-10">7 дней бесплатно. Без привязки карты.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 px-4 sm:px-0">
          <a href={config.downloadUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-4">
              <Download className="w-5 h-5" />
              {config.downloadLabel}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
