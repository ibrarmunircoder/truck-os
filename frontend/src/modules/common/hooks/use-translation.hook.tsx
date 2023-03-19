import { Trans, useTranslation as useNextI18nTranslation } from 'next-i18next';
import { ReactElement, useCallback } from 'react';
import { UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

// https://react.i18next.com/latest/usetranslation-hook
// https://react.i18next.com/latest/trans-component

export interface UseTranslationInterface
  extends Pick<UseTranslationResponse<string | string[]>, 't' | 'i18n' | 'ready'> {
  tt: (key: string, values: Record<string, string>) => ReactElement;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

export const useTranslation = (ns?: string | string[], options?: UseTranslationOptions): UseTranslationInterface => {
  const { t, i18n, ready } = useNextI18nTranslation(ns, options);
  const tt = useCallback((i18nKey, values) => <Trans t={t} i18nKey={i18nKey} values={values} />, [t]);

  return {
    t,
    tt,
    i18n,
    ready,
  };
};
