import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';
import { UserInviteInterface } from 'modules/user-invites';

export const useInvitesFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    invites: yup
      .array<UserInviteInterface>()
      .required()
      .of(
        yup.object().shape({
          firstName: yup.string().trim().required(t('input.first-name.validation.required')),
          lastName: yup.string().trim().required(t('input.last-name.validation.required')),
          email: yup
            .string()
            .required(t('input.email.validation.required'))
            .uniqueEmail(t('input.email.validation.unique'))
            .validEmail(t('input.email.validation.type')),
        }),
      ),
  });
};
