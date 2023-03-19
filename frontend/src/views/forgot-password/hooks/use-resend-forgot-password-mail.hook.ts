import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useState } from 'react';

export interface UseResendForgotPasswordMailHookInterface {
  isSent: boolean,
  error: Error;
  handleResendForgotPasswordMail: (email: string) => Promise<void>;
  resetState: ()=>void
}

export const useResendForgotPasswordMail = (): UseResendForgotPasswordMailHookInterface => {
  const [isSent, setIsSent] = useState<boolean>();
  const [error, setError] = useState();

  const handleResendForgotPasswordMail = async (email: string) => {
    try {
      await requestGql<boolean>(
        {
          mutation: gql`
            mutation SendForgotPasswordMail($input: AuthForgotPasswordDto!) {
              sendForgotPasswordMail(input: $input)
            }
          `,
          variables: { input: { email } },
        },
        null,
        'sendForgotPasswordMail',
      )
      setIsSent(true);
    } catch (e) {
      setIsSent(false);
      setError(e);
    }
  }

  return {
    isSent,
    error,
    handleResendForgotPasswordMail,
    resetState: ()=>{
      setError(undefined)
      setIsSent(undefined)
    }
  }
}
