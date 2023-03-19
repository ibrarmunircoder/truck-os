import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { AuthorGenderEnum } from 'modules/example/enums';

interface AuthorEditMutationVariablesInterface {
  name?: string;
  surname?: string;
  age?: number;
  birthDate?: string;
  email?: string;
  address?: Record<string, unknown>;
  gender?: AuthorGenderEnum;
}

interface UseAuthorEditInterface {
  handleAuthorEdit: (variables: AuthorEditMutationVariablesInterface, id: string) => void;
}

export const useAuthorEdit = (): UseAuthorEditInterface => {
  const handleAuthorEdit = async (variables: AuthorEditMutationVariablesInterface, id: string) =>
    requestGql({
      mutation: gql`
        mutation updateAuthorMutation($data: AuthorUpdateDto!, $id: ID!) {
          updateAuthor(author: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data: variables, id },
    });
  return {
    handleAuthorEdit,
  };
};
