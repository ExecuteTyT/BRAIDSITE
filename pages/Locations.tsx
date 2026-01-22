import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Locations: React.FC = () => {
  const { content } = useLanguage();

  const locations = content.locations.list.map((loc, index) => ({
      ...loc,
      ping: ['110ms', '35ms', '42ms', '180ms'][index] 
  }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {content.locations.header}
          </h1>
          <p className="text-gray-400 mb-12">
            {content.locations.subtext}
          </p>

          <div className="space-y-4">
            {locations.map((loc, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl flex items-center justify-between group hover:border-brand-primary/50 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                       <MapPin className="text-brand-primary w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-white font-bold">{loc.country} <span className="text-gray-500 font-normal text-sm">/ {loc.city}</span></h3>
                       <p className="text-xs text-gray-400 mt-1">{loc.use}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">~{loc.ping}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Map Visualization */}
        <div className="relative h-[400px] md:h-[600px] w-full glass-panel rounded-3xl overflow-hidden flex items-center justify-center">
            {/* Map Placeholder using SVG - In real app, use D3 or Mapbox */}
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
              {/* Simple stylized world map points */}
               <circle cx="200" cy="150" r="4" fill="white" className="animate-pulse" /> {/* USA */}
               <circle cx="400" cy="130" r="4" fill="white" className="animate-pulse" /> {/* Europe */}
               <circle cx="650" cy="250" r="4" fill="white" className="animate-pulse" /> {/* Asia */}
               
               {/* Connecting lines */}
               <path d="M200 150 Q 300 50 400 130" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
               <path d="M400 130 Q 525 100 650 250" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
               
               <defs>
                 <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#007AFF" stopOpacity="0" />
                   <stop offset="50%" stopColor="#007AFF" stopOpacity="1" />
                   <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                 </linearGradient>
               </defs>
            </svg>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-0 right-0 text-center">
               <p className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">{content.locations.scanning}</p>
            </div>
        </div>

      </div>
    </div>
  );
};