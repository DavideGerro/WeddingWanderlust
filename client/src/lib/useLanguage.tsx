import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, languages } from './i18n';

interface LanguageContextType {
  language: Language;
  country: string | null;
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
  const [country, setCountry] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const t = translations[language] as typeof translations.en;

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch('/api/geo');
        if (response.ok) {
          const data = await response.json();
          const detectedCountry = data.country as string | null;
          setCountry(detectedCountry);

          // Only apply auto-detected language if user hasn't made a manual choice
          const manualChoice = localStorage.getItem(STORAGE_KEY) as Language | null;
          if (manualChoice && ['en', 'it', 'es', 'fr'].includes(manualChoice)) {
            setLanguage(manualChoice);
          } else {
            const detectedLang = data.language as Language;
            if (['en', 'it', 'es', 'fr'].includes(detectedLang)) {
              setLanguage(detectedLang);
            }
          }
        } else {
          // No geo data — still check for manual language choice
          const manualChoice = localStorage.getItem(STORAGE_KEY) as Language | null;
          if (manualChoice && ['en', 'it', 'es', 'fr'].includes(manualChoice)) {
            setLanguage(manualChoice);
          }
        }
      } catch (error) {
        console.log('Geo detection failed, using default language');
        const manualChoice = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (manualChoice && ['en', 'it', 'es', 'fr'].includes(manualChoice)) {
          setLanguage(manualChoice);
        }
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
        country,
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
