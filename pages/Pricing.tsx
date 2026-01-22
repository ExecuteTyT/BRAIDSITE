import React from 'react';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';
import { PricingTier } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const Pricing: React.FC = () => {
  const { content, language } = useLanguage();

  const plans = [
    {
      id: PricingTier.MONTHLY,
      name: content.pricing.plans.month.name,
      price: language === 'en' ? '$5.00' : '399₽',
      period: content.features.price.period,
      desc: content.pricing.plans.month.desc,
      features: [
        `2 ${content.pricing.plans.features.devices}`, 
        `4 ${content.pricing.plans.features.locations}`, 
        content.pricing.plans.features.speed, 
        content.pricing.plans.features.logs
      ],
      highlight: false
    },
    {
      id: PricingTier.SIX_MONTHS,
      name: content.pricing.plans.six_month.name,
      price: language === 'en' ? '$3.50' : '299₽',
      period: content.features.price.period,
      desc: content.pricing.plans.six_month.desc,
      features: [
        `3 ${content.pricing.plans.features.devices}`, 
        `4 ${content.pricing.plans.features.locations}`, 
        content.pricing.plans.features.speed, 
        content.pricing.plans.features.logs
      ],
      highlight: false
    },
    {
      id: PricingTier.YEARLY,
      name: content.pricing.plans.year.name,
      price: language === 'en' ? '$2.50' : '199₽',
      period: content.features.price.period,
      desc: content.pricing.plans.year.desc,
      features: [
        `5 ${content.pricing.plans.features.devices}`, 
        content.pricing.plans.features.support, 
        `4 ${content.pricing.plans.features.locations}`, 
        content.pricing.plans.features.speed, 
        content.pricing.plans.features.logs
      ],
      highlight: true,
      badge: content.pricing.plans.year.badge
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.pricing.header}
          </h1>
          <p className="text-gray-400">{content.pricing.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative glass-panel rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
                plan.highlight 
                  ? 'border-brand-primary/50 shadow-[0_0_30px_rgba(0,122,255,0.15)] scale-105 md:scale-110 z-10' 
                  : 'border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-brand-primary">
                      <Check size={12} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlight ? 'primary' : 'secondary'} 
                className="w-full"
              >
                {content.pricing.btn}
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-32 max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
           <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">{content.pricing.table.title}</h3>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="border-b border-white/10">
                   <th className="py-4 pl-4 text-gray-500 font-normal">{content.pricing.table.col_feature}</th>
                   <th className="py-4 text-white font-bold text-center">BRAID</th>
                   <th className="py-4 text-gray-500 font-normal text-center">{content.pricing.table.col_regular}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {content.pricing.table.rows.map((row, i) => (
                   <tr key={i}>
                     <td className="py-4 pl-4 text-gray-300">{row.name}</td>
                     <td className="py-4 text-center text-brand-primary font-bold">{row.braid}</td>
                     <td className="py-4 text-center text-gray-500">{row.reg}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};