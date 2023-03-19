import { parse } from 'accept-language-parser';
import { localeMapping } from 'configuration/app';
import Flags from 'country-flag-icons/react/3x2';
import invert from 'lodash/invert';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { getRoutePathname } from 'modules/common/utils';
import { ComponentType, useCallback, useMemo } from 'react';
const localeReverseMapping = invert(localeMapping);

export interface LocaleOptionInterface {
  id: string;
  label: string;
  shortLabel: string;
  flag: ComponentType<{ className?: string; title?: string; width?: number }>;
  flagCode?: string;
  routerLocale: string;
}

export interface UseLocaleInterface {
  localeOptions: LocaleOptionInterface[];
  localeOption: LocaleOptionInterface;
  setCurrentLocale: (locale: string) => void;
}

export const useLocales = (): UseLocaleInterface => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { locales } = i18n.options as { locales: string[] };

  const localeOptions = useMemo(
    () =>
      locales.map((locale) => {
        const [parsed] = parse(localeMapping[locale]);
        const flagCode = (parsed.region || parsed.code).toUpperCase();

        return {
          id: localeMapping[locale], // this is system locale which is translated from routing locale
          /*
            t('languages.full_en-US')
            t('languages.full_de-DE')
            */
          label: t('languages.full', { context: localeMapping[locale] || locale }),
          /*
            t('languages.short_en-US')
            t('languages.short_de-DE')
            */
          shortLabel: t('languages.short', { context: localeMapping[locale] || locale }),
          flag: Flags[flagCode],
          flagCode: flagCode.toLowerCase(),
          routerLocale: locale,
        };
      }),
    [locales],
  );

  //i18n.language is always the same as nextjs router.locale
  const localeOption = useMemo(
    () => localeOptions.find((x) => x.routerLocale === i18n.language),
    [localeOptions, i18n.language],
  );

  const setCurrentLocale = useCallback(
    async (locale: string) => {
      if (localeReverseMapping[locale] !== i18n.language) {
        /*
          const defaultLocale = i18n.options.defaultLocale;
          const currentLocale = router.locale;
          const currentPath = router.asPath;
          let alias = '';
          if (router.locale === defaultLocale) {
            alias = `/${locale}${currentPath}`;
          } else {
            const localeIdentifier = locale === defaultLocale ? '' : `/${locale}`;
            alias = currentPath.replace(`/${currentLocale}`, localeIdentifier);
          }
          // document.cookie = `NEXT_LOCALE = ${locale};`;
          void router.push(router.asPath, alias, { locale });
        */

        await i18n.changeLanguage(localeReverseMapping[locale]);
        const url = router.route
          ? {
              pathname: getRoutePathname(router.route, localeReverseMapping[locale], router.query),
              query: router.query,
            }
          : router.pathname;
        await router.push(url, url, { locale: localeReverseMapping[locale] });
      }
    },
    [router],
  );

  return {
    localeOption,
    localeOptions,
    setCurrentLocale,
  };
};
