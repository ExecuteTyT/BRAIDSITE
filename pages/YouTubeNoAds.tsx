import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Send, ArrowRight, Check, Star, Youtube, Monitor, Smartphone, Shield, ChevronDown, ChevronUp } from 'lucide-react';
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

export const YouTubeNoAds: React.FC = () => {
  React.useEffect(() => {
    updateMeta({
      title: 'YouTube без рекламы через VPN — Как смотреть Ютуб без рекламы в России 2026',
      description: 'Смотрите YouTube без рекламы с BRAID VPN. Подключитесь к серверу в Армении или Нидерландах — реклама исчезнет автоматически. 7 дней бесплатно, от 163₽/мес.',
      path: '/youtube-bez-reklamy',
      keywords: 'youtube без рекламы, ютуб без рекламы, vpn youtube, смотреть youtube без рекламы',
    });
  }, []);

  const faqItems = [
    { q: 'На каких серверах YouTube без рекламы?', a: 'YouTube без рекламы работает на серверах в Армении и Нидерландах. Подключитесь к любому из этих серверов — реклама исчезнет автоматически. На серверах в России, США, Финляндии реклама останется.' },
    { q: 'Работает ли это на телефоне (Android/iPhone)?', a: 'Да! BRAID VPN работает на всех платформах: Android, iOS, Windows, macOS. Скачайте приложение Happ, подключитесь к Армении или Нидерландам — реклама исчезнет и в приложении YouTube, и в браузере.' },
    { q: 'Это легально? Не заблокируют ли мой аккаунт YouTube?', a: 'Да, это полностью легально. Вы просто подключаетесь к VPN, что не запрещено. YouTube не блокирует аккаунты за использование VPN — миллионы людей делают это ежедневно.' },
    { q: 'Будет ли тормозить видео?', a: 'Нет, BRAID VPN работает на скорости до 10 Гбит/с. Вы сможете смотреть YouTube в 4K без буферизации. Пинг до Армении всего ~35ms, до Нидерландов ~45ms.' },
    { q: 'Сколько это стоит?', a: 'Первые 7 дней — бесплатно. Потом от 163₽/месяц при годовой подписке (или 199₽/мес при помесячной оплате). Это дешевле, чем YouTube Premium (399₽/мес), и при этом вы получаете ещё и VPN для обхода блокировок.' },
    { q: 'Работает ли это в 2026 году?', a: 'Да, YouTube без рекламы через VPN работает в 2026 году. Google не блокирует серверы в Армении и Нидерландах. Мы следим за изменениями и обновляем серверы, если что-то меняется.' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-12">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <Youtube className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm text-green-400 font-medium">YouTube без рекламы</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            YouTube без рекламы — <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-brand-primary">Смотрите Ютуб без раздражающей рекламы</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            Подключите BRAID VPN к серверу в Армении или Нидерландах — реклама на YouTube исчезнет автоматически. Никаких расширений, подписок YouTube Premium или сложных настроек. Работает на Android, iOS, компьютере.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-gray-300">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Реклама исчезает автоматически</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Работает на всех устройствах</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Не нужен YouTube Premium</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> 7 дней бесплатно, от 163₽/мес</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
              <span>4.9/5</span>
            </div>
            <span className="hidden sm:inline">—</span>
            <span>более 1000 пользователей смотрят YouTube без рекламы</span>
          </div>
        </div>
      </section>

      {/* Проблема */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Устали от рекламы на YouTube в России?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Реклама перед каждым видео — по 5-15 секунд', 'Реклама посреди ролика — прерывает просмотр', 'Двойная реклама — нужно пропускать дважды', 'YouTube Premium дорогой — 399₽/мес только за отключение рекламы'].map((item, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 flex items-start gap-3">
                <span className="text-red-400 text-lg">😤</span>
                <span className="text-gray-300 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-center mt-8 max-w-2xl mx-auto">
            В России реклама на YouTube стала особенно назойливой в 2025-2026 году. Google показывает больше рекламы, чем в других странах. Но есть простое решение — VPN.
          </p>
        </div>
      </section>

      {/* Решение */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Как убрать рекламу на YouTube с помощью VPN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Почему VPN убирает рекламу на YouTube?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              В некоторых странах (Армения, Нидерланды, Финляндия) YouTube показывает меньше рекламы или вообще не показывает её. Когда вы подключаетесь к VPN-серверу в этих странах, YouTube думает, что вы смотрите видео оттуда — и реклама автоматически исчезает.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Какие серверы убирают рекламу на YouTube?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇦🇲</span>
                <div>
                  <div className="text-white font-medium">Армения (Ереван)</div>
                  <div className="text-gray-400 text-sm">YouTube без рекламы, пинг ~35ms</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇳🇱</span>
                <div>
                  <div className="text-white font-medium">Нидерланды (Амстердам)</div>
                  <div className="text-gray-400 text-sm">YouTube без рекламы, пинг ~45ms</div>
                </div>
              </div>
            </div>
            <p className="text-yellow-400/80 text-xs mt-4">⚠️ Серверы в России, США, Великобритании НЕ убирают рекламу на YouTube.</p>
          </div>
        </div>
      </section>

      {/* Как это работает - шаги */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-10 text-center">Как смотреть YouTube без рекламы — Пошаговая инструкция</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Получите бесплатный VPN-ключ', desc: 'Запустите Telegram-бота BRAID VPN и получите ключ за 30 секунд. Первые 7 дней — бесплатно, без привязки карты.' },
              { step: '2', title: 'Скачайте приложение VPN', desc: 'Установите приложение Happ на Android, iPhone, Windows или macOS. Все приложения бесплатные.' },
              { step: '3', title: 'Подключитесь к Армении или Нидерландам', desc: 'Вставьте ключ в приложение и выберите сервер. Откройте YouTube — реклама исчезнет автоматически!' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 text-center relative">
                <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-display font-bold text-xl mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
            <NavLink to="/android" className="text-brand-primary hover:underline">Скачать VPN для Android</NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/ios" className="text-brand-primary hover:underline">Скачать VPN для iPhone</NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/windows" className="text-brand-primary hover:underline">Скачать VPN для Windows</NavLink>
            <span className="text-gray-600">|</span>
            <NavLink to="/mac" className="text-brand-primary hover:underline">Скачать VPN для macOS</NavLink>
          </div>
        </div>
      </section>

      {/* До/После сравнение */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-10 text-center">YouTube без VPN vs YouTube с BRAID VPN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-red-500/20">
            <h3 className="text-lg font-bold text-red-400 mb-4">❌ Без VPN (Россия)</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>• Реклама перед каждым видео (5-15 сек)</li>
              <li>• Реклама посреди ролика (несколько раз)</li>
              <li>• Двойная реклама (нужно пропускать 2 раза)</li>
              <li>• YouTube Premium 399₽/мес только за отключение рекламы</li>
            </ul>
          </div>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-green-500/20">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ С BRAID VPN (Армения/Нидерланды)</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> Никакой рекламы — вообще</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> Видео начинается сразу</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> Никаких прерываний посреди ролика</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> Всего 163₽/мес + обход блокировок</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Сравнительная таблица */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Почему BRAID VPN лучше других способов убрать рекламу на YouTube</h2>
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-4 text-gray-500 font-normal">Способ</th>
                    <th className="py-4 px-4 text-gray-500 font-normal">Цена</th>
                    <th className="py-4 px-4 text-gray-500 font-normal">Все устройства</th>
                    <th className="py-4 px-4 text-gray-500 font-normal">Доп. функции</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-brand-primary/5">
                    <td className="py-4 px-4 text-white font-bold">BRAID VPN</td>
                    <td className="py-4 px-4 text-green-400">От 163₽/мес</td>
                    <td className="py-4 px-4 text-green-400">✅ Да (Android, iOS, ПК)</td>
                    <td className="py-4 px-4 text-green-400">✅ Обход блокировок, до 5 устройств</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-300">YouTube Premium</td>
                    <td className="py-4 px-4 text-gray-400">399₽/мес</td>
                    <td className="py-4 px-4 text-gray-400">✅ Да</td>
                    <td className="py-4 px-4 text-gray-500">⚠️ Только офлайн и музыка</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-300">Расширения браузера</td>
                    <td className="py-4 px-4 text-gray-400">Бесплатно</td>
                    <td className="py-4 px-4 text-red-400">❌ Только ПК</td>
                    <td className="py-4 px-4 text-red-400">❌ Не работает в приложении YouTube</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Частые вопросы про YouTube без рекламы через VPN</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 relative z-10">Начните смотреть YouTube без рекламы прямо сейчас</h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 relative z-10 max-w-2xl mx-auto">
          Получите 7 дней бесплатного доступа к BRAID VPN. Без привязки карты, без рисков. Просто попробуйте — если не понравится, ничего не платите.
        </p>
        <div className="flex justify-center relative z-10">
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-base sm:text-lg px-10 py-4 cta-pulse">
              <Send className="w-5 h-5" />
              Получить 7 дней бесплатно
            </Button>
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs sm:text-sm text-gray-500 relative z-10">
          <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Гарантия возврата 7 дней</span>
          <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-500" /> Безопасно — никаких логов</span>
          <span className="flex items-center gap-1"><Smartphone className="w-4 h-4 text-green-500" /> Работает на всех устройствах</span>
        </div>
      </section>

      {/* SEO текст */}
      <section className="py-12 container mx-auto px-4 sm:px-6 max-w-4xl border-t border-white/5">
        <h2 className="text-xl font-display font-bold text-white mb-4">Дополнительная информация о YouTube без рекламы</h2>
        <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
          <div>
            <h3 className="text-white font-medium mb-2">Почему в России так много рекламы на YouTube</h3>
            <p>Google показывает больше рекламы в России, чем в других странах, потому что рекламодатели платят меньше за показы. Чтобы компенсировать это, Google увеличивает количество рекламных блоков. В 2025-2026 году ситуация ухудшилась — теперь реклама может появляться 2-3 раза за одно видео.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Альтернативы YouTube Premium</h3>
            <p>YouTube Premium стоит 399₽/месяц и даёт только отключение рекламы, офлайн-режим и YouTube Music. BRAID VPN стоит всего 163₽/месяц и даёт не только YouTube без рекламы, но и обход блокировок, доступ к Discord, ChatGPT, защиту приватности и возможность подключить до 5 устройств.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Как работает VPN для YouTube</h3>
            <p>VPN (Virtual Private Network) создаёт зашифрованное соединение между вашим устройством и VPN-сервером в другой стране. Когда вы подключаетесь к серверу в Армении или Нидерландах, YouTube думает, что вы находитесь в этой стране — и показывает контент без рекламы.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
