import { gql } from '@apollo/client';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces';
import { requestGql } from 'modules/common/utils/request-gql';
import { AuthorInterface } from 'modules/example/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { AuthorSortEnum } from 'views/authors/enums';

export interface UseAuthorsTableInterface extends AuthorTableStateInterface {
  handlePageChange: (newPage: number, pageSize: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleOrderChange: (sort: AuthorSortEnum, order: OrderEnum) => void;
}

export interface AuthorTableStateInterface {
  authors: AuthorInterface[];
  isLoading?: boolean;
  error?: Error;
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  order: {
    sort: AuthorSortEnum;
    order: OrderEnum;
  };
}

export interface AuthorsQueryInterface extends PaginationInterface {
  order?: {
    order: OrderEnum;
    sort: string;
  };
}

export const useAuthorsTable = (): UseAuthorsTableInterface => {
  const [tableState, setTableState] = useState<AuthorTableStateInterface>({
    pageNumber: 0,
    pageSize: 5,
    order: { sort: AuthorSortEnum.CREATED_AT, order: OrderEnum.DESC },
    authors: [],
    error: null,
    isLoading: false,
  });
  const { totalCount, pageNumber, pageSize, order, authors, isLoading, error } = tableState;

  const fetchAuthors = async (query: AuthorsQueryInterface) => {
    try {
      setTableState({ ...tableState, isLoading: true, error: null });
      const { totalCount: count, data: list } = await requestGql<{ totalCount: number; data: AuthorInterface[] }>(
        {
          query: gql`
            query AuthorsQuery($limit: Int, $offset: Int, $order: AuthorOrderArgType) {
              authors(limit: $limit, offset: $offset, order: $order) {
                totalCount
                data {
                  id
                  name
                  surname
                  email
                  birthDate
                  gender
                  age
                  address
                }
              }
            }
          `,
          variables: {
            limit: query.limit,
            offset: query.offset,
            order: query.order,
          },
        },
        null,
        'authors',
      );
      setTableState({ ...tableState, authors: [...list], totalCount: count, isLoading: false });
    } catch (e) {
      setTableState({ ...tableState, error: e, isLoading: false });
    }
  };
  useEffect(() => {
    void fetchAuthors({
      offset: pageNumber * pageSize,
      limit: pageSize,
      order,
    });
  }, [pageNumber, pageSize, order]);

  const handleOrderChange = useCallback(
    (sort: AuthorSortEnum, orderDirection: OrderEnum) => {
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

  const handlePageRowsCountChange = useCallback(
    (newPageSize: number) => {
      setTableState((ts) => ({
        ...ts,
        pageSize: newPageSize,
      }));
    },
    [setTableState],
  );

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

  return {
    authors,
    isLoading,
    error,
    pageNumber,
    pageSize,
    order,
    totalCount,
    handlePageChange,
    handlePageSizeChange: handlePageRowsCountChange,
    handleOrderChange,
  };
};
