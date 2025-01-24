import React, { createContext, ReactNode, useState } from 'react';

type Language = 'ru' | 'en-us';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };

