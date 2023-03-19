import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface BookCreateMutationVariablesInterface {
  title?: string;
  publishingDate?: string;
  price?: number;
  description?: string;
  published?: boolean;
  outOfStock?: boolean;
  authorId?: string;
}

interface UseBookCreateInterface {
  handleBookCreate: (variables: BookCreateMutationVariablesInterface) => Promise<string>;
}

export const useBookCreate = (): UseBookCreateInterface => {
  const handleBookCreate = async (variables: BookCreateMutationVariablesInterface) => {
    const { id } = await requestGql<{ id: string }>(
      {
        mutation: gql`
          mutation createBookMutation($data: BookCreateDto!) {
            createBook(book: $data) {
              id
            }
          }
        `,
        variables: { data: variables },
      },
      null,
      'createBook',
    );

    return id;
  };
  return {
    handleBookCreate,
  };
};
