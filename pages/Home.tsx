import React from 'react';
import { HeroCanvas } from '../components/HeroCanvas';
import { Button } from '../components/Button';
import { Shield, Globe, Zap, Smartphone, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { content } = useLanguage();
  
  const brands = [
    { name: 'Netflix', opacity: 0.6 },
    { name: 'YouTube 4K', opacity: 0.8 },
    { name: 'ChatGPT', opacity: 0.7 },
    { name: 'Instagram', opacity: 0.6 },
    { name: 'Spotify', opacity: 0.7 },
    { name: 'Hulu', opacity: 0.6 },
    { name: 'Binance', opacity: 0.8 },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <HeroCanvas />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">{content.hero.title_prefix}</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                {content.hero.title_suffix}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              {content.hero.subtitle_1} 
              <span className="text-white font-medium"> {content.hero.subtitle_2}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button variant="primary" className="w-full sm:w-auto">{content.hero.cta_primary}</Button>
               <Button variant="secondary" className="w-full sm:w-auto" icon={<Smartphone size={18}/>}>
                  {content.hero.cta_secondary}
               </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-mono">
               <span className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 {content.hero.system}
               </span>
               <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
               <span>{content.hero.version}</span>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center relative">
             {/* Abstract Sphere Representation */}
             <div className="relative w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full border border-brand-primary/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-brand-accent/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-full blur-2xl"></div>
                {/* Floating Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-6 glass-panel rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl animate-float">
                   <div className="text-4xl font-bold font-display text-white mb-1">0ms</div>
                   <div className="text-xs text-brand-primary uppercase tracking-widest">{content.hero.latency}</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-sm py-6 overflow-hidden">
        <div className="flex w-[200%] animate-ticker hover:[animation-play-state:paused]">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-1 flex justify-center items-center px-12 min-w-[200px]">
              <span className="text-2xl font-display font-bold text-white/40 uppercase hover:text-white hover:text-glow transition-all cursor-default">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Features */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Box 1: Protocol */}
          <div className="md:col-span-1 md:row-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/20 transition-all duration-700"></div>
            <Shield className="w-12 h-12 text-brand-primary mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">{content.features.protocol.title}</h3>
            <p className="text-gray-400 mb-8">{content.features.protocol.desc}</p>
            <div className="mt-auto h-32 w-full bg-gradient-to-t from-brand-primary/20 to-transparent rounded-lg border border-brand-primary/20 flex items-center justify-center relative">
               <div className="w-full h-[1px] bg-brand-primary/50 absolute top-1/2"></div>
               <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/4 shadow-[0_0_10px_white]"></div>
               <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 right-1/4 shadow-[0_0_10px_white]"></div>
            </div>
          </div>

          {/* Box 2: Speed */}
          <div className="md:col-span-2 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">{content.features.speed.title}</h3>
                <p className="text-gray-400">{content.features.speed.desc}</p>
              </div>
              <div className="w-20 h-20 rounded-full border-2 border-brand-accent flex items-center justify-center">
                 <Zap className="w-8 h-8 text-brand-accent" />
              </div>
            </div>
          </div>

          {/* Box 3: Price */}
          <div className="md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center hover:border-brand-primary/50 transition-colors cursor-pointer group">
             <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">{content.features.price.label}</div>
             <div className="text-5xl font-display font-bold text-white group-hover:text-glow transition-all">{content.features.price.amount}<span className="text-xl text-gray-500 font-sans">{content.features.price.period}</span></div>
          </div>

           {/* Box 4: Locations */}
           <div className="md:col-span-1 md:row-span-1 glass-panel rounded-3xl p-8 relative overflow-hidden">
             <Globe className="w-10 h-10 text-white mb-4" />
             <h3 className="text-xl font-bold text-white">{content.features.locations.title}</h3>
             <p className="text-sm text-gray-400 mt-2">{content.features.locations.desc}</p>
          </div>

        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-black/20">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-16">{content.steps.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { step: '01', title: content.steps.step1.title, desc: content.steps.step1.desc, icon: <Smartphone size={32} /> },
                 { step: '02', title: content.steps.step2.title, desc: content.steps.step2.desc, icon: <Lock size={32} /> },
                 { step: '03', title: content.steps.step3.title, desc: content.steps.step3.desc, icon: <Zap size={32} /> },
               ].map((item, idx) => (
                 <div key={idx} className="relative group">
                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-6 group-hover:border-brand-primary/50 group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
                       <span className="text-gray-300">{item.icon}</span>
                    </div>
                    <div className="text-6xl font-display font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 container mx-auto px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 relative z-10">
          {content.cta_bottom.title}
        </h2>
        <div className="flex justify-center relative z-10">
          <Button variant="primary" className="text-lg px-12 py-4">
            {content.cta_bottom.button}
          </Button>
        </div>
      </section>
    </div>
  );
};