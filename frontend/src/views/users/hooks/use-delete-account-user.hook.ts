import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { requestGql } from 'modules/common/utils/request-gql';
import { deleteAccountUserAction, updateAccountSolePower } from 'modules/users/slices';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
interface AccountUpdateValuesInterface {
  solePower?: boolean;
}
interface UseDeleteAccountUserInterface {
  error: null;
  handleDeleteAccountUser: (id: string) => Promise<void>;
  resetError: () => void;
  handleCloseAccountUserSuccessfulModal: () => void;
  handleDeleteAccountUserSolePowerChange: (
    accountUserId: string,
    accountId: string,
    account: AccountUpdateValuesInterface,
    callback: () => void,
  ) => Promise<void>;
  isUpdated: boolean;
}

const createDeleteAccountUserMutationOptions = (id: string) => ({
  mutation: gql`
    mutation deleteAccountUser($id: ID!) {
      deleteAccountUser(id: $id)
    }
  `,
  variables: { id },
});

const createAccountUpdateMutationOptions = (id: string, account: AccountUpdateValuesInterface) => ({
  mutation: gql`
    mutation updateAccount($id: ID!, $account: AccountUpdateDto!) {
      updateAccount(id: $id, account: $account) {
        solePower
      }
    }
  `,
  variables: { id, account },
});

export const useDeleteAccountUser = (): UseDeleteAccountUserInterface => {
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteAccountUser = async (id: string) => {
    try {
      const deletedId = await requestGql(createDeleteAccountUserMutationOptions(id), null, 'deleteAccountUser');
      if (deletedId) {
        dispatch(deleteAccountUserAction(deletedId));
        setIsUpdated(true);
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setIsUpdated(false);
    }
  };

  const handleDeleteAccountUserSolePowerChange = async (
    accountUserId: string,
    accountId: string,
    account: AccountUpdateValuesInterface,
    callback: () => void,
  ) => {
    try {
      const result = await Promise.all([
        requestGql(createAccountUpdateMutationOptions(accountId, account), null, 'updateAccount'),
        requestGql(createDeleteAccountUserMutationOptions(accountUserId), null, 'deleteAccountUser'),
      ]);
      const deletedId = result[1];
      const accountSolePowerUpdated = result[0];
      if (deletedId && accountSolePowerUpdated) {
        dispatch(deleteAccountUserAction(deletedId));
        dispatch(updateAccountSolePower(accountSolePowerUpdated));
        callback();
        setIsUpdated(true);
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setIsUpdated(false);
    }
  };

  const handleCloseAccountUserSuccessfulModal = useCallback(() => setIsUpdated(false), []);

  const resetError = useCallback(() => setError(null), []);

  return {
    error,
    handleDeleteAccountUser,
    handleCloseAccountUserSuccessfulModal,
    handleDeleteAccountUserSolePowerChange,
    isUpdated,
    resetError,
  };
};
