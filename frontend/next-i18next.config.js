module.exports = {
  i18n: {
    defaultLocale: process.env.NEXT_PUBLIC_LOCALE_DEFAULT || 'en',
    locales: ['en', 'de'],
    defaultLanguage: 'en',
    fallbackLng: ['en'],
    defaultNS: 'common',
    dateFnsLocales: ['en-US', 'de'],
  },
  localeMapping: {
    en: 'en-US',
    de: 'de-DE',
  },
};
