import { parse } from 'accept-language-parser';
import { localeMapping } from 'configuration/app';
import { Locale } from 'date-fns';
import { useRouter } from 'modules/common/hooks';
import { DateFnsLocaleContext } from 'modules/date-time/contexts';
import { FunctionalComponent } from 'preact';
import React, { useEffect, useState } from 'react';

export const DateFnsLocaleProvider: FunctionalComponent = ({ children }) => {
  const { locale } = useRouter();
  const [dateFnsLocales, setDateFnsLocales] = useState<Record<string, Locale>>({});

  useEffect(() => {
    if (!(locale in dateFnsLocales)) {
      void import(`date-fns/locale/${localeMapping[locale]}/index.js`)
        .catch(() => {
          const [parsed] = parse(localeMapping[locale]);
          return import(`date-fns/locale/${parsed.code}/index.js`);
        })
        .then((module) => {
          setDateFnsLocales({ ...dateFnsLocales, [locale]: module });
        });
    }
  }, [locale]);
  return <DateFnsLocaleContext.Provider value={dateFnsLocales[locale]}>{children}</DateFnsLocaleContext.Provider>;
};
