import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface StringFilterInterface {
  equalTo?: string;
  notEqualTo?: string;
  valueIn?: string[];
  valueNotIn?: string[];
  like?: string;
  iLike?: string;
}

interface AccountFilterArgInterface {
  id?: StringFilterInterface;
  accountId?: StringFilterInterface;
}

interface UseDeleteFilesInterface {
  deleteFiles: (filter: AccountFilterArgInterface) => Promise<string[]>;
}

export const useDeleteAccountFiles = (): UseDeleteFilesInterface => {
  const deleteFiles = (filter: AccountFilterArgInterface) =>
    requestGql<string[]>(
      {
        mutation: gql`
          mutation deleteAccountFiles($filter: AccountFilesFilterArgType!) {
            deleteAccountFiles(filter: $filter)
          }
        `,
        variables: {
          filter,
        },
      },
      null,
      'deleteAccountFiles',
    );

  return { deleteFiles };
};
