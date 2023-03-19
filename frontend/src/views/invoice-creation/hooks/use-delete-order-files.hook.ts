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

interface OrderFilesFilterArgInterface {
  id?: StringFilterInterface;
  orderId?: StringFilterInterface;
}

interface UseDeleteFilesInterface {
  deleteFiles: (filter: OrderFilesFilterArgInterface) => Promise<string[]>;
}

export const useDeleteOrderFiles = (): UseDeleteFilesInterface => {
  const deleteFiles = (filter: OrderFilesFilterArgInterface) =>
    requestGql<string[]>(
      {
        mutation: gql`
          mutation deleteOrderFiles($filter: OrderFilesFilterArgType!) {
            deleteOrderFiles(filter: $filter)
          }
        `,
        variables: {
          filter,
        },
      },
      null,
      'deleteOrderFiles',
    );

  return { deleteFiles };
};
