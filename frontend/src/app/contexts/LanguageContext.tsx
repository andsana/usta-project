import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'ru' | 'en-us';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const getLanguageFromUrl = (pathname: string): Language =>
  pathname.startsWith('/en') ? 'en-us' : 'ru';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>(() => getLanguageFromUrl(location.pathname));

  useEffect(() => {
    setLanguage(getLanguageFromUrl(location.pathname));
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };

