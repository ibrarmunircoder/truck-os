import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { requestGql } from 'modules/common/utils/request-gql';
import { addPaymentDetails } from 'modules/invoice-creation/invoice-creation.slice';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface UseFetchOrderHookInterface {
  handleFetchOrder: (debtorId: string) => void;
}

const fetchOrder = (debtorId: string) => ({
  query: gql`
    query order($filter: OrderFilterArgType!) {
      orders(filter: $filter) {
        data {
          id
          invoiceDate
          invoiceAmount
          deliveryDate
          invoiceNumber
          paymentTerm
          applicableLaw
        }
      }
    }
  `,
  variables: {
    filter: { debtorId: { equalTo: debtorId } },
  },
});

export const useFetchOrder = (): UseFetchOrderHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const handleFetchOrder = useCallback(async (debtorId: string) => {
    const response = await requestGql<OrdersInterface>(fetchOrder(debtorId), null, 'orders');
    const order = response && response.data?.length ? response.data[0] : null;
    dispatch(addPaymentDetails(order));
  }, []);

  return {
    handleFetchOrder,
  };
};
