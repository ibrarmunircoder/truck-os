/* eslint-disable @roq/no-invalid-hook-resource */
import { gql, QueryOptions } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { paymentDashboardAccountSelector } from 'modules/payment-dashboard/selectors/payment-dashboard-account.selector';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { paymentCompletedStatuses, paymentPendingStatuses } from 'views/payment-dashboard/utils';

interface UsePaymentCardHookInterface {
  opened: number;
  received: number;
}

export const fetchOrderQueryOptions = (accountId: string): QueryOptions => ({
  query: gql`
    query orders($filter: OrderFilterArgType, $search: OrderSearchArgType, $limit: Int, $offset: Int) {
      orders(filter: $filter, search: $search, limit: $limit, offset: $offset) {
        totalCount
        data {
          id
          deliveryDate
          receivableAmount
          paymentTerm
          receivableReferenceId
          status
          debtor {
            id
            name
            debtorReferenceId
            status
          }
        }
      }
    }
  `,
  variables: {
    filter: {
      accountId: { equalTo: accountId },
    },
  },
});

export const usePaymentCard = (): UsePaymentCardHookInterface => {
  const [orders, setOrders] = useState<OrdersInterface>({ totalCount: 0, data: [] });
  const account = useSelector(paymentDashboardAccountSelector);

  useEffect(() => {
    const getOrders = async () => {
      if (account) {
        try {
          const result = await requestGql<OrdersInterface>(
            fetchOrderQueryOptions(account.id as string),
            null,
            'orders',
          );
          setOrders(result);
        } catch (err) {
          console.error(err);
        }
      }
    };
    void getOrders();
  }, [account, setOrders]);

  const received = useMemo(() => {
    if (orders && orders.data.length) {
      return orders.data
        .filter((order) => paymentCompletedStatuses.includes(order?.status ?? null))
        .reduce((total, current) => total + current.receivableAmount, 0);
    }
    return 0;
  }, [orders]);

  const opened = useMemo(() => {
    if (orders && orders.data.length) {
      return orders.data
        .filter((order) => paymentPendingStatuses.includes(order?.status ?? null))
        .reduce((total, current) => total + current.receivableAmount, 0);
    }
    return 0;
  }, [orders]);

  return {
    opened,
    received,
  };
};
