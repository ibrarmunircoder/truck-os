import JsTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useRouter } from 'modules/common/hooks';
import { ReactElement, useEffect, useState } from 'react';

JsTimeAgo.addLocale(en);

const instances = { 'en': new JsTimeAgo('en') };

interface TimeAgoInterface {
  date: Date | string | number;
  style?: string;
  now?: Date | string;
}

const stylesConfig = {
  short: {
    flavour: 'short',
    units: ['now', 'minute', 'hour', 'day', 'week', 'month', 'year'],
  },
};

export const TimeAgo = ({ date, style, ...options }: TimeAgoInterface): ReactElement => {
  const { locale } = useRouter();
  const [isLanguageSupported, setLanguageSupported] = useState<boolean>(!!instances[locale]);
  const importLanguage = async () => {
    const module = await import(`javascript-time-ago/locale/${locale}`);
    JsTimeAgo.addLocale(module);
    instances[locale] = new JsTimeAgo(locale);
    setLanguageSupported(true);
  };
  useEffect(() => {
    if (!(locale in instances)) {
      void importLanguage();
    }

  }, [locale]);

  return (isLanguageSupported ? instances[locale] : instances.en).format(
    date,
    style in stylesConfig ? stylesConfig[style] : style,
    options,
  );
};
