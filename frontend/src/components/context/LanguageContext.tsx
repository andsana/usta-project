import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'en-us';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
