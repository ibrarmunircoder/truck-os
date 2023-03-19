import { yup } from 'modules/common/validation';
import { AuthorGenderEnum } from 'modules/example/enums';
import { useTranslation } from 'next-i18next';

export const useAuthorEditFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    name: yup.string().required(t('author-create.errors.name')).trim().max(50, t('author-create.errors.maxChar')),
    surname: yup.string().trim().max(50, t('author-create.errors.maxChar')),
    age: yup.number().integer().moreThan(-1, t('author-create.errors.age')),
    birthDate: yup.date().typeError(t('author-create.errors.birthDate')),
    email: yup.string().required(t('author-create.errors.email')).trim().email(t('author-create.errors.email')),
    address: yup.object({
      houseNumber: yup.string().trim(),
      street: yup.string().trim(),
      city: yup.string().trim(),
      country: yup.string().trim(),
      zipCode: yup.string().max(5, t('author-create.errors.zipCode')),
    }),
    gender: yup.string().oneOf([AuthorGenderEnum.MALE, AuthorGenderEnum.FEMALE, AuthorGenderEnum.OTHERS]),
  });
};
