import { yup } from 'modules/common/validation';
import { useTranslation } from 'next-i18next';

export const useBookEditFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    title: yup.string().required(t('book-create.errors.title')).trim().max(50, t('book-create.errors.maxChar')),
    description: yup.string().trim(),
    price: yup.number().moreThan(0, t('book-create.errors.price')),
    publishingDate: yup.date().typeError(t('book-create.errors.publishingDate')),
    published: yup.boolean(),
    outOfStock: yup.boolean(),
    authorId: yup.string().trim().required(t('book-create.errors.authorId')),
    files: yup.array().min(1, t('book-create.errors.files.min')).max(3, t('book-create.errors.files.max')),
  });
};
