import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';

const createFetchOrderQueryOptions = (id: string) => ({
  query: gql`
    query order($id: ID!) {
      order(id: $id) {
        id
        invoiceNumber
        invoiceDate
        invoiceAmount
        paymentTerm
        deliveryDate
        applicableLaw
        receivableAmount
        status
        orderFiles {
          url
          name
          key
          fileCategory
        }
        debtorRepresentative {
          id
          name
          phone
          email
          firstName
          lastName
          debtorId
        }
        debtor {
          id
          debtorReferenceId
          streetAndNumber
          name
          addressAddon
          status
        }
      }
    }
  `,
  variables: { id },
});

export const useFetchOrder = (): { handleFetchOrder: (orderId: string) => Promise<OrderResponseInterface> } => {
  const handleFetchOrder = async (orderId: string): Promise<OrderResponseInterface> =>
    requestGql<OrderResponseInterface>(createFetchOrderQueryOptions(orderId), null, 'order');

  return {
    handleFetchOrder,
  };
};
