import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { zhCN, enUS, Translations, TranslationKey } from './translations';

type Language = 'zh-CN' | 'en-US';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  getToolName: (id: string) => string;
  getToolDescription: (id: string) => string;
  getCategoryName: (category: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  'zh-CN': zhCN,
  'en-US': enUS
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'zh-CN';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const getToolName = (id: string): string => {
    const key = `tools.${id}.name` as TranslationKey;
    return translations[language][key] || id;
  };

  const getToolDescription = (id: string): string => {
    const key = `tools.${id}.description` as TranslationKey;
    return translations[language][key] || '';
  };

  const getCategoryName = (category: string): string => {
    const key = `category.${category}` as TranslationKey;
    return translations[language][key] || category;
  };

  return (
    <I18nContext.Provider
      value={{ language, setLanguage, t, getToolName, getToolDescription, getCategoryName }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
