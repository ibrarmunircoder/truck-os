import { gql } from '@apollo/client';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces';
import { requestGql } from 'modules/common/utils/request-gql';
import { BookInterface } from 'modules/example/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { BookSortEnum } from 'views/books/enums';

export interface UseBooksTableInterface extends BookTableStateInterface {
  handlePageChange: (newPage: number, pageSize: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleOrderChange: (sort: BookSortEnum, order: OrderEnum) => void;
}

export interface BookTableStateInterface {
  books: BookInterface[];
  isLoading?: boolean;
  error?: Error;
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  order: {
    sort: BookSortEnum;
    order: OrderEnum;
  };
}

export interface BooksQueryInterface extends PaginationInterface {
  order?: {
    order: OrderEnum;
    sort: string;
  };
}

export const useBooksTable = (): UseBooksTableInterface => {
  const [tableState, setTableState] = useState<BookTableStateInterface>({
    pageNumber: 0,
    pageSize: 5,
    order: { sort: BookSortEnum.CREATED_AT, order: OrderEnum.DESC },
    books: [],
    error: null,
    isLoading: false,
  });
  const { totalCount, pageNumber, pageSize, order, books, isLoading, error } = tableState;

  const fetchBooks = async (query: BooksQueryInterface) => {
    try {
      setTableState({ ...tableState, isLoading: true, error: null });
      const { totalCount: count, data: list } = await requestGql<{ totalCount: number; data: BookInterface[] }>(
        {
          query: gql`
            query BooksQuery($limit: Int, $offset: Int, $order: BookOrderArgType) {
              books(limit: $limit, offset: $offset, order: $order) {
                totalCount
                data {
                  id
                  title
                  description
                  price
                  published
                  publishingDate
                  outOfStock
                  authorId
                  author {
                    name
                    surname
                  }
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
        'books',
      );
      setTableState({ ...tableState, books: [...list], totalCount: count, isLoading: false });
    } catch (e) {
      setTableState({ ...tableState, error: e, isLoading: false });
    }
  };
  useEffect(() => {
    void fetchBooks({
      offset: pageNumber * pageSize,
      limit: pageSize,
      order,
    });
  }, [pageNumber, pageSize, order]);

  const handleOrderChange = useCallback(
    (sort: BookSortEnum, orderDirection: OrderEnum) => {
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
    books,
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
