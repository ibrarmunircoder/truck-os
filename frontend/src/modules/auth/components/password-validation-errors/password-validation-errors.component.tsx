import { usePasswordValidation } from 'modules/auth/hooks/use-password-validation.hook';
import { useTranslation } from 'modules/common/hooks';
import { ValidationErrors } from 'modules/forms/components/validation-errors';
import { useValidation } from 'modules/forms/hooks';
import React, { ReactElement } from 'react';
import { BaseSchema } from 'yup';

const defaultRules = ['len', 'uppercase', 'digit', 'character'];

export type PasswordValidationErrorsProps = {
  value: string | undefined | null;
  title?: string;
  label?: string;
  schema?: BaseSchema;
  rules?: string[];
};

export const PasswordValidationErrors = ({
  title,
  value,
  label,
  schema,
  rules = defaultRules,
}: PasswordValidationErrorsProps): ReactElement => {
  const { t } = useTranslation();
  const defaultSchema = usePasswordValidation();
  const [passwordValidationRules, passwordValidationErrors] = useValidation({
    schema: schema || defaultSchema,
    value,
    label: label || t('input.password.placeholder'),
    rules,
  });

  return <ValidationErrors
    title={title || t('password-validation-base-text')}
    rules={passwordValidationRules}
    errors={passwordValidationErrors}
  />;
};
