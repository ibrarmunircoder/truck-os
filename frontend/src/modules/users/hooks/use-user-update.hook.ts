/* eslint-disable @roq/lodash-destructuring-import-is-not-allowed */
import { gql } from '@apollo/client';
import { omit } from 'lodash';
import { ComplexError } from 'modules/common/types';
import { requestGql } from 'modules/common/utils/request-gql';
import { AccountKycStatusEnum } from 'modules/company-register/enum';
import { singleUserSelector } from 'modules/users/selectors';
import { setErrorAction, updateAccountUserAction, updateUserAction } from 'modules/users/users.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { AccountUserInterface } from 'views/company-register/interfaces';

export interface UserUpdateValuesInterface {
  firstName?: string;
  lastName?: string;
  timezone?: string;
  locale?: string;
}
export interface AccountUpdateValuesInterface {
  addressAddon?: string;
  bic?: string;
  city?: string;
  companyName?: string;
  phoneNumber?: string;
  country?: string;
  iban?: string;
  kycStatus?: AccountKycStatusEnum;
  legalForm?: string;
  legalRepresentative?: boolean;
  postalCode?: string;
  registrationAuthority?: string;
  registrationAuthorityCity?: string;
  registrationNumber?: string;
  solePower?: boolean;
  streetAndNumber?: string;
  vatId?: string;
  walbingTerm?: boolean;
}
interface AccountUserUpdateValuesInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  language?: string;
  accountUserType?: AccountUserTypeEnum;
  birthplace?: string;
  nationality?: string;
  postalCode?: string;
  streetAndNumber?: string;
  houseNumber?: number;
  city?: string;
  country?: string;
  gender?: string;
}

export interface UseUserUpdateInterface {
  updateUserAndAccount: (
    userId: string,
    accountId: string,
    user: UserUpdateValuesInterface,
    account: AccountUpdateValuesInterface,
    accountUsers: AccountUserInterface[],
  ) => Promise<string>;
  error: ComplexError | null;
  updateUser: (id: string, user: UserUpdateValuesInterface) => Promise<UserUpdateValuesInterface>;
}

const createAccountUserMutationOptions = (accountUser: AccountUpdateValuesInterface) => ({
  mutation: gql`
    mutation createAccountUser($accountUser: AccountUserCreateDto!) {
      createAccountUser(accountUser: $accountUser) {
        id
        accountUserType
        birthday
        birthplace
        houseNumber
        streetAndNumber
        accountId
        email
        city
        country
        language
        firstName
        lastName
        postalCode
        nationality
      }
    }
  `,
  variables: { accountUser },
});

const createUserUpdateMutationOptions = (id: string, user: UserUpdateValuesInterface) => ({
  mutation: gql`
    mutation updateUser($id: ID!, $user: UserUpdateDto!) {
      updateUser(id: $id, user: $user) {
        id
        email
        firstName
        lastName
        timezone
        locale
      }
    }
  `,
  variables: { id, user },
});

const createAccountUpdateMutationOptions = (id: string, account: AccountUpdateValuesInterface) => ({
  mutation: gql`
    mutation updateAccount($id: ID!, $account: AccountUpdateDto!) {
      updateAccount(id: $id, account: $account) {
        id
        companyName
        bic
        iban
        postalCode
        addressAddon
        streetAndNumber
        city
        legalRepresentative
        solePower
        country
        registrationNumber
        registrationAuthority
        registrationAuthorityCity
        legalForm
        vatId
        phoneNumber
      }
    }
  `,
  variables: { id, account },
});

const createAccountUserUpdateMutation = (id: string, accountUser: AccountUserUpdateValuesInterface) => ({
  mutation: gql`
    mutation updateAccount($id: ID!, $accountUser: AccountUserUpdateDto!) {
      updateAccountUser(id: $id, accountUser: $accountUser) {
        id
        firstName
        accountId
        postalCode
        lastName
        language
        city
        email
        country
        nationality
        language
        birthday
        birthplace
        houseNumber
        streetAndNumber
        accountUserType
      }
    }
  `,
  variables: { id, accountUser },
});

export const useUserUpdate = (): UseUserUpdateInterface => {
  const dispatch = useDispatch();
  const { error } = useSelector(singleUserSelector);

  const updateUser = async (id: string, user: UserUpdateValuesInterface): Promise<UserUpdateValuesInterface> =>
    requestGql(createUserUpdateMutationOptions(id, user), null, 'updateUser');

  const updateAccount = async (id: string, account: AccountUpdateValuesInterface) =>
    requestGql(createAccountUpdateMutationOptions(id, account), null, 'updateAccount');

  const updateAccountUser = async (id: string, accountUser: AccountUserUpdateValuesInterface) =>
    requestGql(createAccountUserUpdateMutation(id, accountUser), null, 'updateAccountUser');

  const addNewAccountUser = async (accountUser: AccountUpdateValuesInterface) =>
    requestGql(createAccountUserMutationOptions(accountUser), null, 'createAccountUser');

  const updateUserAndAccount = async (
    userId: string,
    accountId: string,
    user: UserUpdateValuesInterface,
    account: AccountUpdateValuesInterface,
    accountUsers: AccountUserInterface[],
  ): Promise<string> => {
    try {
      const accountUsersAdded = accountUsers.filter((accountUser) => !accountUser.id);
      const existingAccountUsers = accountUsers.filter((accountUser) => accountUser.id);
      const accountUsersAddedPromises = accountUsersAdded.map((accountUser) => addNewAccountUser(accountUser));
      const existingAccountUsersPromises = existingAccountUsers.map((accountUser) => {
        const { id, ...accountUserData } = accountUser;
        return updateAccountUser(id, omit(accountUserData, ['__typename']));
      });
      const result = await Promise.all([
        updateUser(userId, user),
        updateAccount(accountId, omit(account, ['id'])),
        Promise.all(existingAccountUsersPromises),
        Promise.all(accountUsersAddedPromises),
      ]);
      const userData = result[0];
      const accountData = result[1];
      const accountUsersData = result[2];
      const newAccountUsersData = result[3];
      dispatch(updateUserAction(userData));
      dispatch(
        updateAccountUserAction({
          id: accountId,
          accountUsers: [...accountUsersData, ...newAccountUsersData],
          account: accountData,
        }),
      );
      return userId;
    } catch (err) {
      console.error(err);
      dispatch(setErrorAction(err));
    }
  };

  return {
    updateUserAndAccount,
    updateUser,
    error,
  };
};
