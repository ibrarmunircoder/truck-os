import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useCallback } from 'react';

export type ChangePasswordHandlerType = (values: PasswordChangeValuesInterface) => Promise<boolean>;

interface UsePasswordChangeInterface {
  changePassword: ChangePasswordHandlerType;
}

export interface PasswordChangeValuesInterface {
  password: string;
  newPassword: string;
}

export const usePasswordChange = (): UsePasswordChangeInterface => {
  const changePassword = useCallback(async (data: PasswordChangeValuesInterface): Promise<boolean> => true === await requestGql({
      mutation: gql`
        mutation changePasswordMutation($input: ChangePasswordDto!) {
          changePassword(input: $input)
        }
      `,
      variables: { input: { password: data.password, newPassword: data.newPassword } },
    }, null, 'changePassword'), []);

  return {
    changePassword,
  };
};
