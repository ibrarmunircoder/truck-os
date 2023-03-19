import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useCallback } from 'react';

export type ResendEmailHandlerType = () => Promise<boolean>;

interface UseResendEmailInterface {
  resendEmail: ResendEmailHandlerType;
}

export const useResendEmail = (email: string): UseResendEmailInterface => {
  const resendEmail = useCallback(
    async (): Promise<boolean> =>
      true ===
      (await requestGql(
        {
          mutation: gql`
            mutation resendEmailMutation($input: ResendEmailDto!) {
              resendEmail(input: $input)
            }
          `,
          variables: { input: { email } },
        },
        null,
        'resendEmail',
      )),
    [email],
  );

  return {
    resendEmail,
  };
};
