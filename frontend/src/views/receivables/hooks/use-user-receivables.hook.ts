import { gql } from '@apollo/client';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces';
import { requestGql } from 'modules/common/utils/request-gql';
import { OrdersSortEnum } from 'modules/orders/enum';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import routes from 'routes';

interface OrderStateInterface {
  pageNumber: number;
  pageSize: number;
  order: { sort: OrdersSortEnum; order: OrderEnum };
}

interface UseUserReceivablesHookInterface extends OrdersInterface, OrderStateInterface {
  isLoading: boolean;
  error: null;
  handlePageChange: (newPage: number, pageSize: number) => void;
  handleOrderChange: (sort: OrdersSortEnum, order: OrderEnum) => void;
  accountName: string;
}

type IdFilterArgType = {
  equalTo?: string;
  notEqualTo?: string;
  valueIn?: [string];
  valueNotIn?: [string];
};

type OrderFilterArgType = {
  accountId: IdFilterArgType;
};

export interface OrdersPaginationInterface extends PaginationInterface {
  filter?: OrderFilterArgType;
  order?: { sort: OrdersSortEnum; order: OrderEnum };
}

const createReceivablesQueryOptions = (query: OrdersPaginationInterface) => ({
  query: gql`
    query orders($limit: Int, $offset: Int, $filter: OrderFilterArgType, $order: OrderOrderArgType) {
      orders(limit: $limit, offset: $offset, filter: $filter, order: $order) {
        totalCount
        data {
          id
          invoiceAmount
          invoiceNumber
          receivableAmount
          receivableReferenceId
          deliveryDate
          invoiceDate
          paymentTerm
          status
        }
      }
    }
  `,
  variables: { limit: query.limit, offset: query.offset, filter: query.filter, order: query.order },
});

export const useUserReceivables = (): UseUserReceivablesHookInterface => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState<OrdersInterface>({
    data: [],
    totalCount: 0,
  });
  const [tableState, setTableState] = useState<OrderStateInterface>({
    pageNumber: 0,
    pageSize: 10,
    order: { sort: OrdersSortEnum.CREATED_AT, order: OrderEnum.DESC },
  });
  const router = useRouter();
  const { account, accountName } = router.query;

  const { pageNumber, pageSize, order } = tableState;

  const fetchUserReceivablesOnMount = useCallback(
    async (query: OrdersPaginationInterface) => {
      try {
        setIsLoading(true);
        const result = await requestGql<OrdersInterface>(createReceivablesQueryOptions(query), null, 'orders');
        setOrders(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setIsLoading(false);
      }
    },
    [account],
  );

  useEffect(() => {
    if (!account) {
      void router.push({
        pathname: `/${routes.paymentDashboard}`,
      });
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      void fetchUserReceivablesOnMount({
        offset: pageNumber * pageSize,
        limit: pageSize,
        filter: { accountId: { equalTo: account as string } },
        order,
      });
    }
  }, [account, pageNumber, pageSize, order]);

  const handlePageChange = useCallback(
    (newPageNumber: number, newPageSize: number) => {
      setTableState((ts) => ({
        ...ts,
        pageNumber: newPageNumber,
        pageSize: newPageSize,
      }));
    },
    [setTableState],
  );

  const handleOrderChange = useCallback(
    (sort: OrdersSortEnum, orderDirection: OrderEnum) => {
      setTableState((ts) => ({
        ...ts,
        order: {
          sort,
          order: orderDirection,
        },
      }));
    },
    [setTableState],
  );

  return {
    isLoading,
    error,
    ...orders,
    pageNumber,
    pageSize,
    order,
    handlePageChange,
    handleOrderChange,
    accountName: accountName as string,
  };
};
