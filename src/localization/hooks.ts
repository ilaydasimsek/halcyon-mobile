import { useEffect } from 'react';
import { default as i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';

import { languageDetector, phoneLocale } from './utils';
import { en } from './languages';

export const useSetupLocalization = () => {
  useEffect(() => {
    i18n
      .use(languageDetector)
      .use(initReactI18next)
      .init({
        lng: phoneLocale,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: en,
          },
        },
      });
  }, []);
};
