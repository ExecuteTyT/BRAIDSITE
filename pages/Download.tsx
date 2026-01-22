import React from 'react';
import { Smartphone, Monitor, Apple, Download, Send, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const DownloadPage: React.FC = () => {
  const { content } = useLanguage();

  const platforms = [
    {
      id: 'ios',
      name: content.download.platforms.ios.name,
      desc: content.download.platforms.ios.desc,
      url: content.download.platforms.ios.url,
      badge: content.download.platforms.ios.badge,
      icon: <Apple className="w-8 h-8" />,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
      hoverBorder: 'hover:border-gray-500/60'
    },
    {
      id: 'android',
      name: content.download.platforms.android.name,
      desc: content.download.platforms.android.desc,
      url: content.download.platforms.android.url,
      badge: content.download.platforms.android.badge,
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      hoverBorder: 'hover:border-green-500/60'
    },
    {
      id: 'windows',
      name: content.download.platforms.windows.name,
      desc: content.download.platforms.windows.desc,
      url: content.download.platforms.windows.url,
      badge: content.download.platforms.windows.badge,
      icon: <Monitor className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            <Download className="w-4 h-4 text-brand-primary" />
            <span className="text-sm text-brand-primary font-medium">Бесплатное приложение</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.download.header}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {content.download.subtext}
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-panel rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 group ${platform.borderColor} ${platform.hoverBorder}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${platform.bgColor} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                {platform.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{platform.desc}</p>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${platform.color} text-white font-medium group-hover:shadow-lg transition-shadow`}>
                <Download className="w-4 h-4" />
                {platform.badge}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </div>
            </a>
          ))}
        </div>

        {/* Instructions */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            {content.download.instruction.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {content.download.instruction.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-gray-300">{step}</p>
                  </div>
                </div>
                {i < content.download.instruction.steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%-10px)] w-6">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Get Key CTA */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Send className="w-8 h-8 text-brand-primary" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Первый шаг — получить ключ
            </h2>
          </div>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Запустите нашего Telegram-бота и получите бесплатный ключ за 30 секунд.
            Ключ действует 7 дней — без оплаты и без данных карты.
          </p>

          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-lg px-8 py-4">
              <Send className="w-5 h-5" />
              Получить ключ в Telegram
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Мгновенная выдача
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              7 дней бесплатно
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Без карты
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-xl font-display font-bold text-white mb-8 text-center">
            Частые вопросы
          </h3>

          <div className="space-y-4">
            {content.faq.items.slice(0, 3).map((item, i) => (
              <div key={i} className="glass-panel rounded-2xl p-6">
                <h4 className="text-white font-bold mb-2">{item.q}</h4>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
