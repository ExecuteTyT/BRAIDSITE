import React from 'react';
import { Shield, Lock, Zap, Wifi, Smartphone, EyeOff, Send, ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/Button';
import { applySeo, breadcrumbLd, faqLd, SITE_URL } from '../utils/meta';
import { tgBotUrl } from '../utils/telegram';

// СТРОГО COMPLIANT-лендинг под Яндекс.Директ (РФ).
// Никаких упоминаний обхода/блокировок/РКН/разблокировки/заблокированных сервисов.
// Рендерится БЕЗ глобальных Navbar/Footer/TelegramProxyBanner (см. App.tsx) —
// поэтому страница целиком чистая для модерации.

const TELEGRAM = tgBotUrl('ads_bezopasnost');

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden border border-white/5">
      <button onClick={() => setOpen(!open)} className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors group">
        <h3 className="text-sm sm:text-base font-medium text-white pr-4">{q}</h3>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FEATURES = [
  { icon: Lock, title: 'Шифрование трафика', text: 'Соединение защищено современным шифрованием — ваши данные не прочитать в публичных сетях.' },
  { icon: Wifi, title: 'Безопасный Wi-Fi', text: 'Защита в кафе, аэропортах и отелях, где открытые сети особенно уязвимы.' },
  { icon: Zap, title: 'Высокая скорость', text: 'Серверы до 10 Гбит/с и низкий пинг — стриминг и игры без потери качества.' },
  { icon: EyeOff, title: 'Приватность без логов', text: 'Мы не храним историю и не передаём данные третьим лицам.' },
  { icon: Smartphone, title: 'До 5 устройств', text: 'Один доступ на телефон, планшет и компьютер одновременно.' },
  { icon: Shield, title: 'Простое приложение', text: 'Установка и подключение за пару минут на iOS, Android, Windows и macOS.' },
];

const STEPS = [
  { n: 1, title: 'Получите доступ', text: 'Запустите Telegram-бота и получите доступ за 30 секунд — без карты и регистрации.' },
  { n: 2, title: 'Установите приложение', text: 'Скачайте приложение для вашей платформы: iPhone, Android, Windows или macOS.' },
  { n: 3, title: 'Подключитесь', text: 'Выберите сервер и включите защищённое соединение в один тап.' },
];

const FAQ = [
  { q: 'Что такое VPN и зачем он нужен?', a: 'VPN создаёт защищённое зашифрованное соединение между вашим устройством и сервером. Это повышает приватность и защищает данные, особенно в открытых Wi-Fi-сетях.' },
  { q: 'Это безопасно?', a: 'Да. Трафик шифруется, а мы не ведём логи активности. BRAID — российский сервис с поддержкой на русском языке и оплатой картами РФ.' },
  { q: 'Сколько устройств можно подключить?', a: 'До 5 устройств одновременно на одном доступе — телефон, планшет и компьютер.' },
  { q: 'Будет ли тормозить интернет?', a: 'Нет. Серверы работают на скорости до 10 Гбит/с с низким пингом — комфортно для видео и игр.' },
  { q: 'Сколько это стоит?', a: 'Первые 7 дней — бесплатно, без карты. Далее от 163 ₽/мес при годовой подписке. Оплата картами РФ.' },
  { q: 'На каких устройствах работает?', a: 'iOS, Android, Windows и macOS. Приложение простое — подключение в один тап.' },
];

export const LandingBezopasnost: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    applySeo({
      title: 'BRAID VPN — приватность и защита данных | 7 дней бесплатно',
      description: 'Защищённое и приватное интернет-соединение: шифрование трафика, безопасность в открытых Wi-Fi, скорость до 10 Гбит/с. До 5 устройств, от 163 ₽/мес. 7 дней бесплатно.',
      path: '/bezopasnost',
      keywords: ['vpn', 'защита данных', 'приватность', 'шифрование трафика', 'безопасное соединение', 'vpn для устройств'],
      jsonLd: [breadcrumbLd('Безопасность и приватность', '/bezopasnost'), faqLd(FAQ)],
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-200">
      {/* Minimal clean header */}
      <header className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="BRAID VPN" className="w-7 h-7" />
            <span className="font-display font-bold text-lg tracking-widest text-white">BRAID VPN</span>
          </div>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-sm px-4 sm:px-5 py-2">Подключить</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            <Shield className="w-4 h-4 text-brand-primary" />
            <span className="text-xs sm:text-sm text-brand-primary font-medium">Приватность и защита данных</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">
            BRAID VPN — защищённое и приватное соединение
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Шифрование трафика, безопасность в открытых Wi-Fi и скорость до 10 Гбит/с. До 5 устройств. Простое приложение для всех платформ.
          </p>
          <ul className="flex flex-wrap justify-center gap-3 mb-8">
            {['Шифрование трафика', 'До 5 устройств', 'Без логов', 'Скорость 10 Гбит/с'].map((b, i) => (
              <li key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                <Check className="w-3.5 h-3.5 text-green-400" />{b}
              </li>
            ))}
          </ul>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 group">
              <Send className="w-5 h-5" />Попробовать 7 дней бесплатно
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">Без карты • До 5 устройств • Оплата картами РФ</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16">
            {[['10 Гбит/с', 'Скорость'], ['5', 'Устройств'], ['99.9%', 'Аптайм'], ['163 ₽', 'От / месяц']].map(([v, l], i) => (
              <div key={i} className="glass-panel rounded-xl p-4 sm:p-6 text-center">
                <div className="text-xl sm:text-3xl font-display font-bold text-brand-primary mb-1">{v}</div>
                <div className="text-xs sm:text-sm text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-10 sm:mb-14 text-center">Зачем нужен BRAID VPN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-panel rounded-2xl p-5 sm:p-6">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-10 sm:mb-14 text-center">Как начать за 3 шага</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="glass-panel rounded-2xl p-5 sm:p-6 relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white">{s.n}</div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 mt-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-14">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 py-3.5 sm:py-4">
                <Send className="w-5 h-5" />Начать бесплатно<ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-8 sm:mb-12 text-center">Частые вопросы</h2>
          <div className="space-y-3 sm:space-y-4">
            {FAQ.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 sm:mb-6">Готовы попробовать?</h2>
          <p className="text-base sm:text-lg text-gray-400 mb-8">7 дней бесплатно, без карты. До 5 устройств. Приложение для всех платформ.</p>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 group">
              <Send className="w-5 h-5" />Получить доступ в Telegram<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </section>

      {/* Minimal clean footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span>© 2026 BRAID VPN</span>
          <a href={`${SITE_URL}/pricing`} className="hover:text-brand-primary transition-colors">Тарифы</a>
        </div>
      </footer>
    </div>
  );
};
