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
const VALID_LANGS: Language[] = ['en', 'it', 'es', 'fr'];

const countryToLanguage = (countryCode: string): Language | null => {
  switch (countryCode) {
    case 'IT':
      return 'it';
    case 'ES':
      return 'es';
    case 'FR':
    case 'MA':
      return 'fr';
    default:
      return null;
  }
};

const browserLanguage = (): Language => {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const base = l.slice(0, 2).toLowerCase() as Language;
    if (VALID_LANGS.includes(base)) {
      return base;
    }
  }
  return 'en';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  const [country, setCountry] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const t = translations[language] as typeof translations.en;

  useEffect(() => {
    const manualChoice = localStorage.getItem(STORAGE_KEY) as Language | null;
    const hasManualChoice = !!manualChoice && VALID_LANGS.includes(manualChoice);

    // Apply the user's manual choice (or browser language) immediately.
    if (hasManualChoice) {
      setLanguage(manualChoice as Language);
    } else {
      setLanguage(browserLanguage());
    }

    const detectGeo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const detectedCountry = (data.country_code as string | undefined)?.toUpperCase() || null;
          setCountry(detectedCountry);

          // Only override the browser language with a geo-detected one if the
          // user hasn't chosen manually AND the country maps to a known language.
          if (!hasManualChoice && detectedCountry) {
            const geoLang = countryToLanguage(detectedCountry);
            if (geoLang) {
              setLanguage(geoLang);
            }
          }
        }
      } catch (error) {
        console.log('Geo detection failed, using browser/default language');
      } finally {
        setIsDetecting(false);
      }
    };

    detectGeo();
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
