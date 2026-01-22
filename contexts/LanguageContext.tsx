import React, { createContext, useContext, ReactNode } from 'react';
import { content } from '../constants/translations';

type ContentType = typeof content;

interface LanguageContextType {
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LanguageContext.Provider value={{ content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
