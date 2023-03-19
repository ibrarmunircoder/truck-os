import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';
import { useMemo } from 'react';

export const useRepeatPasswordValidation = (passwordFieldName = 'password'): yup.StringSchema => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      yup
        .string()
        .required(t('input.confirm-new-password.validation.required'))
        .oneOf([yup.ref(passwordFieldName)], t('input.confirm-new-password.validation.mismatch')),
    [t],
  );
};
