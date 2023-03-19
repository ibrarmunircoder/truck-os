import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';
import { useMemo } from 'react';

// Password Special Characters
// https://www.owasp.org/index.php/Password_special_characters

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const usePasswordValidation = (): yup.StringSchema => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      yup
        .string()
        .required(t('input.password.validation.required'))
        .test(
          'len',
          ({ path }) => t('input.password.validation.char-limit', { path }),
          (v) => (v?.length || 0) >= PASSWORD_MIN_LENGTH && (v.length || 0) <= PASSWORD_MAX_LENGTH,
        )
        .matches(/(?=.*[A-Z])/, {
          name: 'uppercase',
          message: ({ path }) => t('input.password.validation.upper-char-required', { path }),
        })
        .matches(/(?=.*\d)/, {
          name: 'digit',
          message: ({ path }) => t('input.password.validation.number-required', { path }),
        })
        .matches(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/, {
          name: 'character',
          message: ({ path }) => t('input.password.validation.special-char-required', { path }),
        }),
    [t],
  );
};
