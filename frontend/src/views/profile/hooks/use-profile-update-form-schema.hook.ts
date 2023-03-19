import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

export const useProfileUpdateFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    firstName: yup.string().trim().required(t('input.first-name.validation.required')),
    lastName: yup.string().trim().required(t('input.last-name.validation.required')),
  });
};
