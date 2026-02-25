import React from 'react';
import { Button } from '../components/Button';
import { Check, Send, Sparkles, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TELEGRAM_BOT_URL = 'https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA==';

export const Pricing: React.FC = () => {
  const { content } = useLanguage();

  const plans = [
    {
      id: 'month',
      name: content.pricing.plans.month.name,
      price: content.pricing.plans.month.price,
      pricePerMonth: content.pricing.plans.month.pricePerMonth,
      desc: content.pricing.plans.month.desc,
      features: content.pricing.plans.month.features,
      highlight: false,
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'six_month',
      name: content.pricing.plans.six_month.name,
      price: content.pricing.plans.six_month.price,
      pricePerMonth: content.pricing.plans.six_month.pricePerMonth,
      desc: content.pricing.plans.six_month.desc,
      saving: content.pricing.plans.six_month.saving,
      features: content.pricing.plans.six_month.features,
      highlight: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'year',
      name: content.pricing.plans.year.name,
      price: content.pricing.plans.year.price,
      pricePerMonth: content.pricing.plans.year.pricePerMonth,
      desc: content.pricing.plans.year.desc,
      badge: content.pricing.plans.year.badge,
      saving: content.pricing.plans.year.saving,
      features: content.pricing.plans.year.features,
      highlight: true,
      icon: <Sparkles className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <span className="text-sm text-green-400 font-medium">7 дней бесплатно для всех тарифов</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.pricing.header}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">{content.pricing.subtext}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass-panel rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                plan.highlight
                  ? 'border-brand-primary/50 shadow-[0_0_30px_rgba(0,122,255,0.15)] md:scale-110 z-10'
                  : 'border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.highlight ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-gray-400'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>

              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

              <div className="mb-2">
                <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">{plan.pricePerMonth}</div>

              {plan.saving && (
                <div className="text-sm text-green-400 mb-6">{plan.saving}</div>
              )}
              {!plan.saving && <div className="mb-6"></div>}

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.highlight ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-brand-primary'
                    }`}>
                      <Check size={12} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  <Send className="w-4 h-4" />
                  {content.pricing.btn}
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Trial Banner */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-20 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Не уверены? Попробуйте бесплатно!
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Получите 7 дней полного доступа без оплаты. Никаких данных карты не требуется.
            Просто запустите бота и получите ключ.
          </p>
          <div className="flex justify-center">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-lg px-8">
                <Send className="w-5 h-5" />
                Получить бесплатный ключ
              </Button>
            </a>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">
            {content.pricing.table.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pl-4 text-gray-500 font-normal">{content.pricing.table.col_feature}</th>
                  <th className="py-4 text-white font-bold text-center">BRAID VPN</th>
                  <th className="py-4 text-gray-500 font-normal text-center">{content.pricing.table.col_regular}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {content.pricing.table.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pl-4 text-gray-300">{row.name}</td>
                    <td className="py-4 text-center">
                      <span className="text-brand-primary font-bold inline-flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        {row.braid}
                      </span>
                    </td>
                    <td className="py-4 text-center text-gray-500">{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ-like section */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-display font-bold text-white mb-6">Остались вопросы?</h3>
          <p className="text-gray-400 mb-6">
            Напишите нам в Telegram — ответим в течение 5 минут
          </p>
          <div className="flex justify-center">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                <Send className="w-4 h-4" />
                Написать в поддержку
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
