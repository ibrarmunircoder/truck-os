import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { DebtorInterface, DebtorRepresentativeInterface } from 'modules/debtors/interfaces';
import { PaymentFormValuesInterface } from 'views/invoice-creation/interfaces';

type OrderFile = {
  id: string;
  name: string;
  url: string;
};

interface OrderResponseInterface extends PaymentFormValuesInterface {
  debtor: DebtorInterface;
  debtorRepresentative: DebtorRepresentativeInterface;
  orderFiles?: OrderFile[];
}

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
        orderFiles {
          id
          key
          url
          name
          fileCategory
        }
        debtor {
          id
          vatNumber
          name
          addressAddon
          commercialRegister
          commercialRegisterNumber
          legalForm
          validated
          debtorReferenceId
          accountId
          postalCode
          streetAndNumber
          city
          country
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
