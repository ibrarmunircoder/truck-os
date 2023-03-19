import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { AuthorGenderEnum } from 'modules/example/enums';

interface AuthorCreateMutationVariablesInterface {
  name?: string;
  surname?: string;
  age?: number;
  birthDate?: string;
  email?: string;
  address?: Record<string, unknown>;
  gender?: AuthorGenderEnum;
}

interface UseAuthorCreateInterface {
  handleAuthorCreate: (variables: AuthorCreateMutationVariablesInterface) => void;
}

export const useAuthorCreate = (): UseAuthorCreateInterface => {
  const handleAuthorCreate = async (variables: AuthorCreateMutationVariablesInterface) =>
    requestGql({
      mutation: gql`
        mutation createAuthorMutation($data: AuthorCreateDto!) {
          createAuthor(author: $data) {
            id
          }
        }
      `,
      variables: { data: variables },
    });
  return {
    handleAuthorCreate,
  };
};
