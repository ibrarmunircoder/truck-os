/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import {
  addCompanyAccountUserAction,
  deleteAccountUserAction,
  resetError,
  setError,
  updateAccountUserAction,
} from 'modules/company-register/company-register.slice';
import { accountRegisterSelector } from 'modules/company-register/selectors/account-register.selector';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountUserInterface } from 'views/company-register/interfaces';

interface UseAddAccountUserHookInterface {
  handleAddNewAccountUser: (data: AccountUserInterface) => void;
  handleUpdateAccountUser: (data: AccountUserInterface, id: string) => Promise<void>;
  viewActiveStep: number;
  handleUpdateAccountUserIndex: (value: number) => void;
  accountUserIndex: number;
  handleEditIconClick: (index: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDeleteIconClick: (index: string) => void;
  error: null;
  handleResetError: () => void;
  handleTooltipClose: () => void;
  handleTooltipOpen: () => void;
  openToolTip: boolean;
}

export const useAddAccountUser = (): UseAddAccountUserHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { account, viewActiveStep, error } = useSelector(accountRegisterSelector);
  const [accountUserIndex, setAccountUserIndex] = useState(-1);
  const [openToolTip, setOpenTooltip] = useState(false);

  const handleResetError = useCallback(() => dispatch(resetError()), [dispatch]);

  const handleUpdateAccountUserIndex = useCallback(
    (value: number) => {
      setAccountUserIndex(value);
    },
    [setAccountUserIndex],
  );

  const handleEditIconClick = useCallback(
    (index: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setAccountUserIndex(index);
    },
    [setAccountUserIndex],
  );

  const handleDeleteIconClick = async (id: string) => {
    await dispatch(
      deleteAccountUserAction({
        mutation: gql`
          mutation deleteAccountUser($id: ID!) {
            deleteAccountUser(id: $id)
          }
        `,
        variables: {
          id,
        },
        keyResponse: 'deleteAccountUser',
      }),
    );
  };

  const handleUpdateAccountUser = async (data: AccountUserInterface, id: string) => {
    const result: any = await dispatch(
      updateAccountUserAction({
        mutation: gql`
          mutation updateNewAccountUser($data: AccountUserUpdateDto!, $id: ID!) {
            updateAccountUser(accountUser: $data, id: $id) {
              firstName
              lastName
              email
              birthday
              language
              id
              birthplace
              nationality
              postalCode
              streetAndNumber
              houseNumber
              city
              country
              accountUserType
              accountId
            }
          }
        `,
        variables: {
          data: {
            ...data,
            ...(data.postalCode ? { postalCode: data.postalCode } : {}),
          },
          id,
        },
        keyResponse: 'updateAccountUser',
      }),
    );

    if (result.type === updateAccountUserAction.rejected.toString()) {
      const messageText = result?.payload?.graphQLErrors.find(graphQLError => !!graphQLError);
      let errorMessage = null
      if (messageText) {
        const errorText = messageText?.extensions?.response?.message.find(responseMessage => !!responseMessage);
        if (errorText) {
          errorMessage = JSON.parse(errorText).message;
        }
      }      
      dispatch(setError(new Error(errorMessage || 'Something went wrong')));
    }
    
    if (result.type === updateAccountUserAction.fulfilled.toString()){
      handleUpdateAccountUserIndex(-1);
    }
  };

  const handleAddNewAccountUser = async (data: AccountUserInterface) => {
    const result: any = await dispatch(
      addCompanyAccountUserAction({
        mutation: gql`
          mutation addNewAccountUser($data: AccountUserCreateDto!) {
            createAccountUser(accountUser: $data) {
              firstName
              lastName
              email
              birthday
              language
              id
              accountUserType
              birthplace
              nationality
              postalCode
              streetAndNumber
              houseNumber
              city
              country
              accountId
            }
          }
        `,
        variables: {
          data: {
            ...data,
            ...(data.postalCode ? { postalCode: data.postalCode } : {}),
            accountId: account.id as string,
          },
        },
        keyResponse: 'createAccountUser',
      }),
    );

    if (result.type === addCompanyAccountUserAction.rejected.toString()) {
      const messageText = result?.payload?.graphQLErrors.find(graphQLError => !!graphQLError);
      let errorMessage = null
      if (messageText) {
        const errorText = messageText?.extensions?.response?.message.find(responseMessage => !!responseMessage);
        if (errorText) {
          errorMessage = JSON.parse(errorText).message;
        }
      }      
      dispatch(setError(new Error(errorMessage || 'Something went wrong')));
    }
  };

  const handleTooltipClose = useCallback(() => setOpenTooltip(false), [setOpenTooltip]);

  const handleTooltipOpen = useCallback(() => setOpenTooltip(true), [setOpenTooltip]);

  return {
    handleAddNewAccountUser,
    handleUpdateAccountUser,
    viewActiveStep,
    handleUpdateAccountUserIndex,
    accountUserIndex,
    handleEditIconClick,
    handleDeleteIconClick,
    handleResetError,
    error,
    openToolTip,
    handleTooltipClose,
    handleTooltipOpen,
  };
};
