import { localeMapping } from 'configuration/app';
import { useAuth } from 'modules/auth/hooks';
import React from 'react';

interface UseTermsConditionHookInterface {
  handleTruckOSTermsClick: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  handlePaymentProviderTermsConditionsClick: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  locale: string;
}

export const useTermsCondition = (): UseTermsConditionHookInterface => {
  const {
    user: { locale },
  } = useAuth();
  const handleTruckOSTermsClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    const anchor = document.createElement('a');
    anchor.href =
      locale === localeMapping.en
        ? '/static/documents/TruckOS-Special-Conditions-EN.pdf'
        : '/static/documents/TruckOS-Special-Conditions-DE.pdf';
    anchor.target = '_blank';
    anchor.click();
  };

  const handlePaymentProviderTermsConditionsClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    const anchor = document.createElement('a');
    anchor.href =
      locale === localeMapping.en
        ? 'https://www.walbing.com/pdf/Terms%20and%20Conditions.pdf'
        : 'https://www.walbing.com/pdf/Plattformbedingungen.pdf';
    anchor.target = '_blank';
    anchor.click();
  };

  return {
    handleTruckOSTermsClick,
    handlePaymentProviderTermsConditionsClick,
    locale,
  };
};
