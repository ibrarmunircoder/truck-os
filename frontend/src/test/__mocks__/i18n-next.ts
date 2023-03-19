/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/imports-should-follow-conventions */
/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/filename-suffix-mismatch */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocales from '../../../public/locales/en/common.json';

void i18n.use(initReactI18next).init({
  resources: { en: { translationsNS: enLocales } },
  fallbackLng: 'en',
  lng: 'en',
  ns: ['translationsNS'],
  defaultNS: 'translationsNS',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export const i18nNext = i18n;
