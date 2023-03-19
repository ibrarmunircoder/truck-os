import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { BookInterface } from 'modules/example/interfaces';
import { useState } from 'react';

interface UseBookFetchInterface {
  isLoading: boolean;
  book: BookInterface | null;
  error: Error;
  handleBookFetch: (id: string) => void;
}

interface BookFetchStateInterface {
  isLoading: boolean;
  book: BookInterface | null;
  error: Error;
}

export const useBookFetch = (): UseBookFetchInterface => {
  const [bookFetchState, setBookFetchState] = useState<BookFetchStateInterface>({
    isLoading: false,
    book: null,
    error: null,
  });

  const handleBookFetch = async (id: string) => {
    try {
      setBookFetchState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await requestGql<BookInterface & { __typename: string }>(
        {
          query: gql`
            query getBook($id: ID!) {
              book(id: $id) {
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
                bookFiles {
                  id
                  name
                  url
                }
              }
            }
          `,
          variables: { id },
        },
        null,
        'book',
      );

      setBookFetchState((prev) => ({ ...prev, book: data, isLoading: false }));
    } catch (err) {
      setBookFetchState((prev) => ({ ...prev, isLoading: false, error: err }));
    }
  };

  return {
    ...bookFetchState,
    handleBookFetch,
  };
};
