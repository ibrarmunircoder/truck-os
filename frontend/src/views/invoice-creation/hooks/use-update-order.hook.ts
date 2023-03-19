import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface UpdateOrderResult {
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

const updateOrderMutationOptions = (id: string, updatedOrder: Partial<UpdateOrderResult>) => ({
  mutation: gql`
    mutation updateOrder($id: ID!, $order: OrderUpdateDto!) {
      updateOrder(id: $id, order: $order) {
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
  variables: { id, order: updatedOrder },
});

export const useUpdateOrder = (): {
  handleUpdateOrder: (id: string, updatedOrder: Partial<UpdateOrderResult>) => Promise<UpdateOrderResult>;
} => {
  const handleUpdateOrder = async (id: string, updatedOrder: Partial<UpdateOrderResult>): Promise<UpdateOrderResult> =>
    requestGql<UpdateOrderResult>(updateOrderMutationOptions(id, updatedOrder), null, 'updateOrder');

  return {
    handleUpdateOrder,
  };
};
