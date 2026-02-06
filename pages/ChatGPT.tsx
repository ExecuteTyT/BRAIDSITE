import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Send, ArrowRight, Check, Shield, ChevronDown, ChevronUp, Globe } from 'lucide-react';

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

export const ChatGPTPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'VPN для ChatGPT в России — Как получить доступ к ChatGPT из РФ в 2026';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Доступ к ChatGPT из России с BRAID VPN. Подключитесь к серверу в США — ChatGPT заработает мгновенно. Пошаговая инструкция. 7 дней бесплатно, от 163₽/мес.');
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', 'https://braidvpn.ru/chatgpt');
  }, []);

  const faqItems = [
    { q: 'Работает ли это с ChatGPT Plus?', a: 'Да, BRAID VPN работает как с бесплатной версией ChatGPT, так и с ChatGPT Plus. Вы сможете пользоваться всеми функциями ChatGPT, включая GPT-4, DALL-E, Code Interpreter и другие.' },
    { q: 'Заблокируют ли мой аккаунт ChatGPT?', a: 'Нет, OpenAI не блокирует аккаунты за использование VPN. Миллионы людей используют VPN для доступа к ChatGPT — это нормальная практика.' },
    { q: 'Нужно ли платить за ChatGPT отдельно?', a: 'Да, BRAID VPN только даёт доступ к ChatGPT из России. Сам ChatGPT бесплатный (базовая версия) или платный (ChatGPT Plus за $20/месяц). VPN и ChatGPT — это разные подписки.' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-12">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6">
            <Globe className="w-4 h-4 text-brand-primary" />
            <span className="text-xs sm:text-sm text-brand-primary font-medium">VPN для ChatGPT</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            VPN для ChatGPT в России — <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Получите доступ к ChatGPT за 2 минуты</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            ChatGPT заблокирован в России с 2023 года. BRAID VPN даёт доступ к ChatGPT через сервер в США. Никаких сложных настроек — просто подключитесь и пользуйтесь ChatGPT как обычно.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-gray-300">
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> Доступ к ChatGPT из России</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> Сервер в США</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> Работает с ChatGPT Plus</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> 7 дней бесплатно</span>
          </div>
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="text-base sm:text-lg px-8 py-4 cta-pulse">
              <Send className="w-5 h-5" />
              Получить доступ к ChatGPT
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </section>

      {/* Проблема */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 text-center">Почему ChatGPT не работает в России</h2>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              OpenAI заблокировала доступ к ChatGPT из России в марте 2023 года. Если вы попытаетесь открыть chat.openai.com из России, увидите ошибку <strong className="text-white">"ChatGPT is not available in your country"</strong>.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Обычный VPN часто тоже не помогает — OpenAI блокирует известные VPN-серверы.
            </p>
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Как BRAID VPN даёт доступ к ChatGPT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Частные серверы в США</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              BRAID VPN использует частные серверы в США, которые не находятся в чёрных списках OpenAI. Когда вы подключаетесь к нашему серверу, ChatGPT думает, что вы из США — и доступ открывается автоматически.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Почему другие VPN не работают с ChatGPT?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              OpenAI блокирует популярные VPN-серверы (NordVPN, ExpressVPN и др.), потому что с них приходит много запросов. BRAID VPN использует частные серверы с хорошей репутацией — OpenAI их не блокирует.
            </p>
          </div>
        </div>
      </section>

      {/* Инструкция */}
      <section className="py-12 sm:py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-10 text-center">Как получить доступ к ChatGPT из России — Инструкция</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Получите VPN-ключ', desc: 'В Telegram-боте за 30 секунд. 7 дней бесплатно.' },
              { step: '2', title: 'Скачайте приложение', desc: 'Happ для компьютера или телефона.' },
              { step: '3', title: 'Подключитесь к США', desc: 'Выберите сервер США (Нью-Йорк).' },
              { step: '4', title: 'Откройте ChatGPT', desc: 'Перейдите на chat.openai.com — работает!' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-5 text-center">
                <div className="w-10 h-10 mx-auto bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-display font-bold text-lg mb-3">{item.step}</div>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-yellow-400/80 text-sm text-center mt-6">⚠️ Для ChatGPT используйте только сервер <strong>США</strong>. Серверы в России, Армении, Нидерландах, Финляндии не дадут доступ к ChatGPT.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">Частые вопросы про VPN для ChatGPT</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4 relative z-10">Начните пользоваться ChatGPT из России</h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 relative z-10">7 дней бесплатно. Доступ к ChatGPT за 2 минуты.</p>
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
