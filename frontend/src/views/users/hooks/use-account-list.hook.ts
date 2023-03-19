import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useState } from 'react';
import { AccountInterface } from 'views/account-settings/interfaces';

interface AccountListResponseInterface {
  data: AccountInterface[];
  totalCount: number;
}
type StringFilterArgType = {
  equalTo?: string;
  iLike?: string;
  like?: string;
  notEqualTo?: string;
  valueIn?: [string];
  valueNotIn?: [string];
};

interface AccountFilterArgInterface {
  registrationNumber?: StringFilterArgType;
  registrationAuthority?: StringFilterArgType;
  iban?: StringFilterArgType;
  userId?: StringFilterArgType;
}

interface UseAccountListHookInterface {
  error: null;
  handleFetchAccountLists: (filter: AccountFilterArgInterface) => Promise<AccountListResponseInterface>;
}

const getAccountListQueryOptions = (filter: AccountFilterArgInterface) => ({
  query: gql`
    query accounts($filter: AccountFilterArgType) {
      accounts(filter: $filter) {
        data {
          id
        }
        totalCount
      }
    }
  `,
  variables: { filter },
});

export const useAccountList = (): UseAccountListHookInterface => {
  const [error, setError] = useState(null);
  const handleFetchAccountLists = async (filter: AccountFilterArgInterface): Promise<AccountListResponseInterface> => {
    try {
      return requestGql<AccountListResponseInterface>(getAccountListQueryOptions(filter), null, 'accounts');
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return {
    handleFetchAccountLists,
    error,
  };
};