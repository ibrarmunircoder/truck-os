import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

export interface AccountDetailsResultInterface {
  accounts: AccountsDataInterface;
}

interface AccountsDataInterface {
  data: AccountDetailsInterface[]
}

interface AccountDetailsInterface {
  id: string;
  virtualDetails: PaymentDetailsInterface;
  companyName: string;
}

interface PaymentDetailsInterface {
  tag?: string;
  iban?: string;
  bic?: string;
  currency?: string;
  isPaymentTransferAccount?: boolean;
}

interface UseDebtorCreateInterface {
  handleGetAccountDetails: (userId: string) => Promise<AccountDetailsResultInterface>;
}

export const useGetAccountDetails = (): UseDebtorCreateInterface => {
  const handleGetAccountDetails = async (userId: string): Promise<AccountDetailsResultInterface> =>
    requestGql({
      query: gql`
            query accountQueryByUser($filter: AccountFilterArgType!) {
              accounts(filter: $filter) {
                data {
                  id
                  virtualDetails {
                    iban
                    bic
                  }
                  companyName
                }
              }
            }
          `,
      variables: { filter: { userId: { equalTo: userId } } },
    })

  return {
    handleGetAccountDetails,
  };
};

