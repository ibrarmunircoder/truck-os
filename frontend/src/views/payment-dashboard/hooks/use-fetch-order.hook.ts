/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/lodash-destructuring-import-is-not-allowed */
import { gql } from '@apollo/client';
import { apolloClient } from 'configuration/apollo/apollo-client';
import { AppDispatch } from 'configuration/redux/store';
import { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { updateIsDebtorDenied, updateOrders } from 'modules/payment-dashboard/payment-dashboard.slice';
import { paymentDashboardIsDeniedSelector, paymentDashboardOrdersSelector } from 'modules/payment-dashboard/selectors';
import { paymentDashboardAccountSelector } from 'modules/payment-dashboard/selectors/payment-dashboard-account.selector';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debtorDeniedStatuses } from 'views/payment-dashboard/utils';

interface UseFetchOrderHookInterface {
  orders: OrdersInterface;
  isDebtorDenied: boolean;
  handleDebtorAlertClose: () => void;
  handleLoadMoreRecords: () => void;
  handleSearchTerm: () => DebouncedFunc<(event: React.ChangeEvent<HTMLInputElement>) => Promise<void>>;
  searchInputRef: React.MutableRefObject<string>;
  error: null;
}

const PAGE_LIMIT = 12;

const fetchOrderQueryOptions = (accountId: string, searchTerm: string, limit: number, offset: number) => ({
  query: gql`
    query orders($filter: OrderFilterArgType, $search: OrderSearchArgType, $limit: Int, $offset: Int) {
      orders(filter: $filter, search: $search, limit: $limit, offset: $offset) {
        totalCount
        data {
          id
          invoiceNumber
          deliveryDate
          draft
          receivableAmount
          paymentTerm
          receivableReferenceId
          createdAt
          status
          orderFiles {
            id
            name
            key
            url
          }
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
    search: { key: 'DEBTOR_NAME', value: searchTerm },
    limit,
    offset,
  },
});

export const useFetchOrder = (): UseFetchOrderHookInterface => {
  const isDebtorDenied = useSelector(paymentDashboardIsDeniedSelector);
  const orders = useSelector(paymentDashboardOrdersSelector);
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector(paymentDashboardAccountSelector);
  const pageRef = useRef(1);
  const searchInputRef = useRef<string | null>(null);
  const abortController = useRef(null);
  const [error, setError] = useState(null);

  const abortLatest = () => abortController.current && abortController.current.abort();

  const handleFetchOrders = useCallback(
    async (searchTerm: string, limit = 0, offset = 0): Promise<OrdersInterface> => {
      try {
        abortController.current = new AbortController();
        const response = await apolloClient().query({
          ...fetchOrderQueryOptions(account.id as string, searchTerm, limit, offset),
          fetchPolicy: 'network-only',
          context: {
            fetchOptions: {
              signal: abortController.current.signal,
            },
          },
        });
        abortController.current = null;
        return response.data.orders as OrdersInterface;
      } catch (err) {
        console.error(err);
        setError(err);
      }
    },
    [account],
  );

  useEffect(() => {
    const getOrders = async () => {
      if (account) {
        const result = await handleFetchOrders('', PAGE_LIMIT);
        dispatch(updateOrders(result));
      }
    };
    void getOrders();
  }, [account]);

  useEffect(() => {
    if (orders && orders.data.length) {
      const isDenied = orders.data.some((order) => debtorDeniedStatuses.includes(order.debtor.debtorStatus));
      void dispatch(updateIsDebtorDenied(isDenied));
    }
  }, [orders, dispatch]);

  const handleSearchOrders = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      abortLatest();
      searchInputRef.current = event.target.value;
      const result = await handleFetchOrders(event.target.value, PAGE_LIMIT);
      pageRef.current = 1;
      dispatch(updateOrders(result));
    },
    [handleFetchOrders, orders, dispatch],
  );

  const handleSearchTerm = useCallback(() => debounce(handleSearchOrders, 500), [handleSearchOrders]);

  const handleLoadMoreRecords = useCallback(async () => {
    const newPage = pageRef.current + 1;
    const offset = newPage > 0 ? (newPage - 1) * PAGE_LIMIT : 0;
    const result = await handleFetchOrders(searchInputRef.current ? searchInputRef.current : '', PAGE_LIMIT, offset);
    const data = orders && orders.data ? orders.data?.concat(result?.data ?? []) : [];
    pageRef.current = newPage;
    dispatch(
      updateOrders({
        ...result,
        data,
      }),
    );
  }, [handleFetchOrders, orders, dispatch]);

  const handleDebtorAlertClose = useCallback(() => void dispatch(updateIsDebtorDenied(false)), [dispatch]);

  return {
    orders,
    isDebtorDenied,
    handleDebtorAlertClose,
    handleSearchTerm,
    handleLoadMoreRecords,
    searchInputRef,
    error,
  };
};
