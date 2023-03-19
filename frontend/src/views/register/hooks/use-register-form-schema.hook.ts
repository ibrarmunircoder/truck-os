import { usePasswordValidation } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

export const useRegisterFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    firstName: yup.string().trim().required(t('input.first-name.validation.required')),
    lastName: yup.string().trim().required(t('input.last-name.validation.required')),
    email: yup
      .string()
      .trim()
      .required(t('input.email.validation.required'))
      .validEmail(t('input.email.validation.type')),
    password: usePasswordValidation(),
  });
};
