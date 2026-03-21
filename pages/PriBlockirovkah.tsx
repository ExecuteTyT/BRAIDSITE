import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Send, ArrowRight, Check, Wifi, Shield, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import { updateMeta } from '../utils/meta';
import { TelegramProxyHint } from '../components/TelegramProxyHint';

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

export const PriBlockirovkah: React.FC = () => {
  React.useEffect(() => {
    updateMeta({
      title: 'VPN при блокировках связи — Работает когда оператор отключает интернет',
      description: 'BRAID VPN работает даже при блокировках интернета оператором (МТС, МегаФон, Билайн, Tele2). Протокол VLESS + Reality обходит ограничения сотовой связи. 7 дней бесплатно.',
      path: '/pri-blokirovkah',
      keywords: 'vpn при блокировках, vpn работает при блокировках связи, vpn мтс блокировка, vpn vless reality',
    });
  }, []);

  const faqItems = [
    { q: 'Почему обычные VPN не работают при блокировках?', a: 'Обычные VPN (OpenVPN, WireGuard) используют специфические протоколы, которые легко обнаруживаются DPI-системами операторов. Когда оператор видит VPN-трафик, он его блокирует. BRAID VPN использует VLESS + Reality, который маскируется под обычный HTTPS и не обнаруживается фильтрами.' },
    { q: 'В каких регионах это работает?', a: 'BRAID VPN работает во всех регионах России, включая Крым, Севастополь, ДНР, ЛНР, Запорожье, Херсон и другие новые регионы. Работает с любым оператором: МТС, МегаФон, Билайн, Tele2.' },
    { q: 'Насколько это безопасно?', a: 'Полностью безопасно. BRAID VPN шифрует весь ваш трафик — оператор видит только HTTPS-соединение, но не может прочитать содержимое. Мы не храним логи и не отслеживаем активность пользователей.' },
  ];

  const operators = [
    { name: 'МТС', desc: 'BRAID VPN работает при блокировках МТС в любых регионах. Обходит ограничения DPI-системы МТС.' },
    { name: 'МегаФон', desc: 'Работает при блокировках МегаФон. Протокол VLESS невидим для фильтров оператора.' },
    { name: 'Билайн', desc: 'Обходит блокировки Билайн в Крыму, ДНР, ЛНР и других регионах.' },
    { name: 'Tele2', desc: 'Работает при ограничениях Tele2. Стабильное соединение даже в проблемных районах.' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-12">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Wifi className="w-4 h-4 text-orange-400" />
            <span className="text-xs sm:text-sm text-orange-400 font-medium">Работает при блокировках</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            VPN при блокировках связи — <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-brand-primary">Работает когда оператор отключает интернет</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            BRAID VPN работает даже когда МТС, МегаФон, Билайн или Tele2 блокируют интернет в вашем районе. Протокол VLESS + Reality обходит ограничения на уровне сотовой связи. Доступ к интернету, когда другие VPN не работают.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-gray-300">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-orange-500" /> Работает при блокировках связи</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-orange-500" /> Обходит ограничения операторов</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-orange-500" /> Протокол VLESS + Reality</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-orange-500" /> 7 дней бесплатно</span>
          </div>
          <div className="flex justify-center">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-base sm:text-lg px-8 py-4 cta-pulse">
                <Send className="w-5 h-5" />
                Попробовать бесплатно
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
          <TelegramProxyHint className="mt-4" />
        </div>
      </section>

      {/* Проблема */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 text-center">Оператор отключает интернет в вашем районе?</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            В России операторы мобильной связи (МТС, МегаФон, Билайн, Tele2) всё чаще ограничивают интернет в определённых районах — особенно в Крыму, ДНР, ЛНР, новых регионах и во время массовых мероприятий.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Интернет работает только в центре города, на окраинах — нет', '4G замедляется до 2G — невозможно открыть сайты', 'Блокируются все сайты, кроме российских', 'Обычные VPN не помогают — они тоже блокируются'].map((item, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 flex items-start gap-3">
                <span className="text-red-400 text-lg">📵</span>
                <span className="text-gray-300 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Как BRAID VPN обходит блокировки связи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Протокол VLESS + Reality — невидим для операторов</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Обычные VPN (OpenVPN, WireGuard, IKEv2) легко обнаруживаются DPI-системами операторов и блокируются. BRAID VPN использует протокол <strong className="text-white">VLESS + Reality</strong>, который маскирует VPN-трафик под обычный HTTPS — оператор видит, что вы просто открываете сайты, и не может заблокировать соединение.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Сервер в России — минимальная задержка</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Наш сервер находится в Москве (пинг ~22ms), что обеспечивает быстрое соединение даже при блокировках. Трафик идёт через российский сервер, а не через зарубежные — это сложнее заблокировать.
            </p>
          </div>
        </div>
      </section>

      {/* Как подключиться */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-10 text-center">Как подключиться к VPN при блокировках</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Получите VPN-ключ', desc: 'Запустите Telegram-бота и получите ключ за 30 секунд. Первые 7 дней бесплатно.' },
              { step: '2', title: 'Установите приложение', desc: 'Скачайте Happ для Android или iOS. Приложение работает даже при ограничениях связи.' },
              { step: '3', title: 'Подключитесь к серверу в России', desc: 'Выберите сервер Россия (Москва) — он работает при блокировках связи. Интернет заработает.' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-display font-bold text-xl mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Операторы */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Работает с любым оператором связи</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {operators.map((op, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-400" />
                {op.name}
              </h3>
              <p className="text-gray-400 text-sm">{op.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Частые вопросы про VPN при блокировках связи</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 relative z-10">Получите доступ к интернету при блокировках связи</h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 relative z-10">Попробуйте BRAID VPN бесплатно 7 дней. Работает там, где другие VPN блокируются.</p>
        <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="relative z-10">
          <Button variant="primary" className="text-base sm:text-lg px-10 py-4 cta-pulse">
            <Send className="w-5 h-5" />
            Попробовать бесплатно
          </Button>
        </a>
      </section>
    </div>
  );
};
