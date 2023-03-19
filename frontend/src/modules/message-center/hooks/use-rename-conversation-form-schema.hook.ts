import { useTranslation } from 'modules/common/hooks';
import * as yup from 'yup';

export const useRenameConversationFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    title: yup.string().required(t('input.conversation-name.validation.required')),
  });
}
