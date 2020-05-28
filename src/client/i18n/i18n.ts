import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsEn from './translations/en.json';
import translationsRu from './translations/ru.json';

enum Lang {
  en = 'en',
  ru = 'ru'
}

const resources = {
  en: {
    translation: translationsEn
  },
  ru: {
    translation: translationsRu
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: Lang.en,
    fallbackLng: Lang.en,
    resources,
    backend: {
      loadPath: 'translations/{{lng}}.json',
    },
    debug: true
  });

const LNG_KEY = 'lng';

const LangHelper = {
  changeLanguage: (lng: Lang): void => {
    i18n.changeLanguage(lng);
    localStorage.setItem(LNG_KEY, lng);
  },
  getLanguage: (): Lang => {
    const lng = localStorage.getItem(LNG_KEY);

    if (!lng) {
      return Lang.en
    }

    return lng as Lang;
  }
}

i18n.changeLanguage(LangHelper.getLanguage());

export {
  i18n as default,
  Lang,
  LangHelper
}
