import { gql } from '@apollo/client';
import { BOOK_ENTITY_NAME } from 'modules/example/constants';
import { FileUploader, getFileType } from 'modules/file/utils';

interface UseBookCreateFileUploader {
  uploadFile: (
    file: File,
    bookId: string,
    onProgress?: (val: number) => void,
  ) => Promise<{ url: string; fileId: string }>;
}
export const useBookCreateFileUploader = (): UseBookCreateFileUploader => {
  const createBookSaveFileMutationOptions = (file: File, bookId: string) => ({
    mutation: gql`
      mutation saveBookFileMutation($data: BookFileCreateDto!) {
        saveBookFile(data: $data) {
          id
          uploadUrl
          contentType
        }
      }
    `,
    variables: {
      data: {
        fileName: file.name,
        fileType: getFileType(file),
        fileAssociationOptions: [
          {
            entityIdentifier: bookId,
            entityName: BOOK_ENTITY_NAME,
          },
        ],
      },
    },
    mutationName: 'saveBookFile',
  });

  const updateFileStatusMutation = () => ({
    mutation: gql`
      mutation updateFileStatus($fileId: ID!, $status: FileStatusEnum!) {
        updateFileStatus(fileId: $fileId, status: $status) {
          url
        }
      }
    `,
    mutationName: 'updateFileStatus',
  });

  const uploadFile = (
    file: File,
    bookId: string,
    onProgress?: (val: number) => void,
  ): Promise<{ url: string; fileId: string }> =>
    new FileUploader().initiateFileUpload({
      selectedFile: file,
      saveFileMutationOptions: createBookSaveFileMutationOptions(file, bookId),
      fileStatusUpdateMutationOptions: updateFileStatusMutation(),
      onError: (e) => {
        throw e;
      },
      onProgress,
    });

  return {
    uploadFile,
  };
};
