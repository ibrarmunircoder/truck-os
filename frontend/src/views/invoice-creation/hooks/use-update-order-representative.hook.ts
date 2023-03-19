import { gql } from '@apollo/client'
import { requestGql } from 'modules/common/utils/request-gql';

export interface OrderUpdateRepresentaiveResultInterface {
  updateOrderRepresentative: OrderUpdateRepresentaiveMutationVariablesInterface;
}

interface OrderUpdateRepresentaiveMutationVariablesInterface {
  id?: string;
  invoiceNumber: string;
  deliveryDate: string | Date;
  invoiceDate: string | Date;
  applicableLaw: string;
  paymentTerm: string;
  invoiceAmount: number;
  debtorId?: string;
  accountId?: string;
  draft?: boolean;
  receivableAmount?: number;
  debtorRepresentativeId?: string;
}

export interface UseDebtorUpdateInterface {
  handleUpdateOrderRepresentative: (id: string, debtorRepresentativeId: string) => Promise<OrderUpdateRepresentaiveResultInterface>;
}

export const useUpdateOrderRepresentative = (): UseDebtorUpdateInterface => {
  const handleUpdateOrderRepresentative = async (id: string, debtorRepresentativeId: string): Promise<OrderUpdateRepresentaiveResultInterface> =>
    requestGql({
      mutation: gql`
            mutation updateOrderRepresentative($id: ID!, $debtorRepresentativeId: ID!) {
                updateOrderRepresentative(id: $id, debtorRepresentativeId: $debtorRepresentativeId) {
                  id
                  invoiceDate
                  invoiceAmount
                  deliveryDate
                  draft
                  applicableLaw
                  paymentTerm
                  invoiceNumber
                  accountId
                  debtorId
                  receivableAmount
                  debtorRepresentativeId
                }
            }
        `,
      variables: { id, debtorRepresentativeId },
    })

  return {
    handleUpdateOrderRepresentative,
  };
};
