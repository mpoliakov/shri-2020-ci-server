import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsEn from './translations/en.json';

const resources = {
  en: {
    translation: translationsEn,
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    backend: {
      loadPath: 'translations/{{lng}}.json',
    },
    debug: true
  });

export default i18n;
