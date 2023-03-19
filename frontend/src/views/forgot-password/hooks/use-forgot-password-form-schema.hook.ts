import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

export const useForgotPasswordFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    email: yup.string().validEmail(t('input.email.validation.type')).required(t('input.email.validation.required')),
  });
};
