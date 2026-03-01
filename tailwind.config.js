/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './contexts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#05050A',
          primary: '#007AFF',
          secondary: '#E5E5EA',
          accent: '#8B5CF6',
          surface: 'rgba(255, 255, 255, 0.03)',
          glass: 'rgba(255, 255, 255, 0.05)',
          success: '#10B981',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,122,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,122,255,0.6)' },
        },
      },
    },
  },
};
