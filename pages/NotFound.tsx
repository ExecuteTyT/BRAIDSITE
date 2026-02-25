import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Zap, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  const { content } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-20 px-4 sm:px-6">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary animate-glow">
            404
          </h1>
          <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[12rem] font-display font-bold text-brand-primary/20 blur-xl">
            404
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 border-2 border-brand-primary/30 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-brand-primary" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
          {content.notFound.title}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          {content.notFound.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
            icon={<Home className="w-4 h-4" />}
          >
            {content.notFound.button_home}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {content.notFound.button_back}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-4 opacity-30">
          <Zap className="w-6 h-6 text-brand-primary animate-pulse" style={{ animationDelay: '0s' }} />
          <Zap className="w-6 h-6 text-brand-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Zap className="w-6 h-6 text-brand-primary animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};
