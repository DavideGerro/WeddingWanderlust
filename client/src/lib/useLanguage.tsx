import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, languages } from './i18n';

interface LanguageContextType {
  language: Language;
  t: typeof translations.en;
  changeLanguage: (lang: Language) => void;
  availableLanguages: typeof languages;
  isDetecting: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'wedding-lang-v2';

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isDetecting, setIsDetecting] = useState(true);
  const t = translations[language] as typeof translations.en;

  useEffect(() => {
    const detectLanguage = async () => {
      const manualChoice = localStorage.getItem(STORAGE_KEY) as Language | null;
      
      if (manualChoice && ['en', 'it', 'es', 'fr'].includes(manualChoice)) {
        setLanguage(manualChoice);
        setIsDetecting(false);
        return;
      }

      try {
        const response = await fetch('/api/geo');
        if (response.ok) {
          const data = await response.json();
          const detectedLang = data.language as Language;
          if (['en', 'it', 'es', 'fr'].includes(detectedLang)) {
            setLanguage(detectedLang);
          }
        }
      } catch (error) {
        console.log('Geo detection failed, using default language');
      } finally {
        setIsDetecting(false);
      }
    };

    detectLanguage();
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        t, 
        changeLanguage,
        availableLanguages: languages,
        isDetecting
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
