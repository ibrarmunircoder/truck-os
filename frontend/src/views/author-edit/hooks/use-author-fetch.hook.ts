import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { AuthorInterface } from 'modules/example/interfaces';
import { useState } from 'react';

interface UseAuthorFetchInterface {
  isLoading: boolean;
  author: AuthorInterface | null;
  error: Error;
  handleAuthorFetch: (id: string) => void;
}

interface AuthorFetchStateInterface {
  isLoading: boolean;
  author: AuthorInterface | null;
  error: Error;
}

export const useAuthorFetch = (): UseAuthorFetchInterface => {
  const [authorFetchState, setAuthorFetchState] = useState<AuthorFetchStateInterface>({
    isLoading: false,
    author: null,
    error: null,
  });

  const handleAuthorFetch = async (id: string) => {
    try {
      setAuthorFetchState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await requestGql<AuthorInterface & { __typename: string }>(
        {
          query: gql`
            query getAuthor($id: ID!) {
              author(id: $id) {
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
          `,
          variables: { id },
        },
        null,
        'author',
      );

      setAuthorFetchState((prev) => ({ ...prev, author: data, isLoading: false }));
    } catch (err) {
      setAuthorFetchState((prev) => ({ ...prev, isLoading: false, error: err }));
    }
  };

  return {
    ...authorFetchState,
    handleAuthorFetch,
  };
};
