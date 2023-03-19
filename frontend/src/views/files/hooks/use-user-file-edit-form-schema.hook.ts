import { useTranslation } from 'modules/common/hooks';
import * as yup from 'yup';

export const useUserFileEditFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    name: yup.string().trim().required(t('file.edit.validations.name.required'))
      .max(255, t('file.edit.validations.name.max-length-exceeded', { characters: 255 }))
      .matches(/^[^\\\/\:\*\?\"\<\>\|\.]+/, t('file.edit.validations.name.invalid-name'))
  });
}
