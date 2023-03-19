import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { useAuth } from 'modules/auth/hooks';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import { FileUploadStatusEnum } from 'modules/file/enums';
import { USER_ENTITY_NAME, USER_FILE_CATEGORY } from 'modules/user-files/constants';
import { fetchFilesAction } from 'modules/user-files/user-files.slice';
import { useDispatch } from 'react-redux';

export interface UserFileListPaginationInterface extends PaginationInterface {
  order?: {
    order: OrderEnum;
    sort: string;
  };
}

export interface UseFetchUserFileListHookInterface {
  fetchUserFiles: (query: UserFileListPaginationInterface) => void;
}

export const useFetchUserFiles = (): UseFetchUserFileListHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const fetchUserFiles = (query: UserFileListPaginationInterface) => {
    void dispatch(
      fetchFilesAction({
        query: gql`
          query filesQuery($limit: Int, $offset: Int, $order: FileOrderArgType, $filter: FileFilterArgType!) {
            files(limit: $limit, offset: $offset, order: $order, filter: $filter) {
              totalCount
              data {
                id
                name
                url
                isPublic
                createdAt
                status
              }
            }
          }
        `,
        variables: {
          limit: query.limit,
          offset: query.offset,
          order: query.order,
          filter: {
            entityName: {
              equalTo: USER_ENTITY_NAME,
            },
            entityIdentifiers: {
              equalTo: user.roqIdentifier,
            },
            fileCategory: {
              equalTo: USER_FILE_CATEGORY,
            },
            status: {
              equalTo: FileUploadStatusEnum.ready,
            },
          },
        },
        context: { service: 'platform' },
      }),
    );
  };

  return {
    fetchUserFiles,
  };
};
