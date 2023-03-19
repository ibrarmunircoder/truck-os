import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

export interface OrderCreateResultInterface {
  createOrder: OrderCreateMutationVariablesInterface;
}

interface OrderCreateMutationVariablesInterface {
  id?: string;
  invoiceNumber?: string;
  deliveryDate?: string | Date;
  invoiceDate?: Date;
  applicableLaw?: string;
  paymentTerm?: string;
  invoiceAmount?: number;
  debtorRepresentativeId?: string;
  debtorId?: string;
  accountId?: string;
  draft?: boolean;
  priority?: number;
}

interface UseOrderCreateInterface {
  handleOrderCreate: (variables: OrderCreateMutationVariablesInterface) => Promise<OrderCreateResultInterface>;
}

export const useOrderCreate = (): UseOrderCreateInterface => {
  const handleOrderCreate = async (
    variables: OrderCreateMutationVariablesInterface,
  ): Promise<OrderCreateResultInterface> =>
    requestGql({
      mutation: gql`
        mutation createOrderMutation($data: OrderCreateDto!) {
          createOrder(order: $data) {
            id
            invoiceNumber
            deliveryDate
            invoiceDate
            applicableLaw
            paymentTerm
            invoiceAmount
            accountId
            debtorId
            draft
            debtorRepresentativeId
          }
        }
      `,
      variables: { data: variables },
    });

  return {
    handleOrderCreate,
  };
};
