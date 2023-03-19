import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface UseDeleteFilesInterface {
  deleteFiles: (ids: string[]) => Promise<string[]>,
}

export const useDeleteFiles = (): UseDeleteFilesInterface => {
  const deleteFiles = (ids: string[]) => requestGql<string[]>({
    mutation: gql`
      mutation deleteFiles($ids: [ID!]!) {
        deleteFiles(filter: { id: { valueIn: $ids } })
      }
    `,
    variables: {
      ids,
    },
  }, null, 'deleteFiles');

  return { deleteFiles };
}
