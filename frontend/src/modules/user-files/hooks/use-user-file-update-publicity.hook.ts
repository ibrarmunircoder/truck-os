import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { FileVisibilityStatusEnum } from 'modules/user-files/enums';

interface FileUpdatePublicityResponseInterface {
  id: string;
  url: string;
  isPublic: boolean;
}

export interface UserFileUpdatePublicityHookInterface {
  changeFilePublicity: (
    id: string,
    visibility: FileVisibilityStatusEnum
  ) => Promise<Partial<FileUpdatePublicityResponseInterface>>;
}

export const useUserFileUpdatePublicity = (): UserFileUpdatePublicityHookInterface => {

  const changeFilePublicity = (id: string, visibility: FileVisibilityStatusEnum) => {

    const mutation = visibility === FileVisibilityStatusEnum.public ? gql`
      mutation MakeFilePublic($id: ID!) {
        makeFilePublic(fileId: $id) {
          id
          url
          isPublic
        }
      }
    ` : gql`
      mutation MakeFilePrivate($id: ID!) {
        makeFilePrivate(fileId: $id) {
          id
          url
          isPublic
        }
      }
    `;
    return requestGql(
      {
        mutation,
        variables: { id },
      },
      null,
      visibility === FileVisibilityStatusEnum.public ? 'makeFilePublic' : 'makeFilePrivate',
    );
  }

  return { changeFilePublicity };
};
