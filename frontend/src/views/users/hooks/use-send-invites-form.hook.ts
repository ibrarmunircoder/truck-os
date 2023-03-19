import { localeMapping } from 'configuration/app';
import { FormikBag, FormikHelpers } from 'formik';
import { useAuth } from 'modules/auth/hooks';
import { useRouter } from 'modules/common/hooks';
import { isJsonString } from 'modules/common/utils';
import { useCallback, useState } from 'react';
import { useSendInvites, UseSendInvitesResponse } from 'views/users/hooks/use-send-invites.hook';
import { UserInviteFormValueInterface } from 'views/users/partials/invite-list/invite-list.partial';

export interface IBulkInviteResponse {
  errorCount: number;
  successCount: number;
}

export interface UseSendInviteFormInterface extends IBulkInviteResponse {
  handleSendInvite: (
    values: UserInviteFormValueInterface,
    actions: FormikHelpers<UserInviteFormValueInterface>,
  ) => void;
  resetResponseCount: () => void;
}

export const useSendInvitesForm = (): UseSendInviteFormInterface => {
  const { user } = useAuth();
  const { locale } = useRouter();
  const { sendInvites } = useSendInvites({ userId: user.roqIdentifier, locale: localeMapping[locale] });
  const [responseCount, setResponseCount] = useState<IBulkInviteResponse>({ errorCount: 0, successCount: 0 });
  const handleSendInvite = useCallback(
    async (
      values: UserInviteFormValueInterface,
      { setFieldValue, setErrors }: FormikBag<unknown, UserInviteFormValueInterface>,
    ) => {
      const { errors, success } = (await sendInvites(values?.invites)) as UseSendInvitesResponse;
      setResponseCount({
        successCount: success?.length || 0,
        errorCount: errors?.length || 0,
      });

      if (errors?.length === 0) {
        setFieldValue('invites', [{ firstName: '', lastName: '', email: '' }], false);
        return;
      }
      // In case of Partial success, when there are failed cases
      const { invites } = values;
      // get all records which were not invited
      const fieldsWithError = invites.filter(({ email }) => errors?.find((inviteError) => inviteError.email === email));
      setFieldValue('invites', fieldsWithError, false);
      // Get all errors
      const formErrors = invites?.reduce((acc, curr) => {
        const isFound = errors?.find(({ email }) => email === curr.email);
        if (isFound) {
          const { error } = isFound;
          const emailErrorMessage = isJsonString(error) ? JSON.parse(error)?.message : error;
          return [
            ...acc,
            {
              email: emailErrorMessage,
            },
          ];
        }
        return acc;
      }, []);
      setErrors({
        invites: formErrors,
      });
    },
    [],
  );

  const resetResponseCount = useCallback(() => {
    setResponseCount({
      successCount: 0,
      errorCount: 0,
    });
  }, []);

  return {
    handleSendInvite,
    resetResponseCount,
    ...responseCount,
  };
};
