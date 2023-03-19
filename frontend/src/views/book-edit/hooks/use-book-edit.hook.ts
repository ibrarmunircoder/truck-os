import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface BookEditMutationVariablesInterface {
  title?: string;
  publishingDate?: string;
  price?: number;
  description?: string;
  published?: boolean;
  outOfStock?: boolean;
  authorId?: string;
}

interface UseBookEditInterface {
  handleBookEdit: (variables: BookEditMutationVariablesInterface, id: string) => void;
}

export const useBookEdit = (): UseBookEditInterface => {
  const handleBookEdit = async (variables: BookEditMutationVariablesInterface, id: string) =>
    requestGql({
      mutation: gql`
        mutation updateBookMutation($data: BookUpdateDto!, $id: ID!) {
          updateBook(book: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data: variables, id },
    });
  return {
    handleBookEdit,
  };
};
