import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { ActiveUploadStatusEnum } from 'modules/file/enums';
import { FileUploader, getFileType } from 'modules/file/utils';
import {
  addActiveUpload,
  addUserFile,
  resetActiveUpload,
  resetActiveUploads,
  resetSuccessfulUploads,
  updateActiveUploadDetails,
  updateActiveUploadPercentage,
  updateActiveUploadStatus
} from 'modules/user-files/user-files.slice';
import { useDispatch } from 'react-redux';
import { useUserFiles } from 'views/files/hooks/use-user-files.hook';

interface UploadUserFileInterface {
  file: File;
  temporaryId: string;
  failedFileData?: {
    id: string;
    contentType: string;
    uploadUrl: string;
  };
}

const createSaveFileMutationOptions = (file: File) => ({
  mutation: gql`
    mutation saveUserFile($fileName: String!, $fileType: String!) {
      saveUserFile(data: { fileName: $fileName, fileType: $fileType }) {
        id
        uploadUrl
        contentType
      }
    }
  `,
  variables: {
    fileName: file.name,
    fileType: getFileType(file),
  },
  mutationName: 'saveUserFile',
});

const createUpdateFileStatusMutationOptions = () => ({
  mutation: gql`
    mutation updateFileStatus($fileId: ID!, $status: FileStatusEnum!) {
      updateFileStatus(fileId: $fileId, status: $status) {
        id
        name
        url
        createdAt
      }
    }
  `,
  mutationName: 'updateFileStatus',
});

export const useUserFileUploader = (): {
  uploadFile: (args: UploadUserFileInterface) => Promise<{ url: string; fileId: string }>;
  removeActiveUploads: () => void;
  cancelActiveUpload: (temporaryId: string) => void;
  restartFailedUpload: (temporaryId: string) => void;
  removeSuccessfulUploads: () => void;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeUploads } = useUserFiles();

  const restartFailedUpload = async (temporaryId: string) => {
    const { id, file, contentType, uploadUrl } = activeUploads.find(
      (activeUpload) => activeUpload.temporaryId === temporaryId,
    );

    if (temporaryId) {
      await uploadFile({
        file,
        temporaryId,
        failedFileData: {
          id,
          contentType,
          uploadUrl,
        },
      });
    }
  };

  const addFileUpload = (file, temporaryId, abortController) => {
    dispatch(
      addActiveUpload({
        temporaryId,
        abortController,
        file,
      }),
    );
  };

  const resetFileUpload = (temporaryId, abortController) => {
    dispatch(
      resetActiveUpload({
        temporaryId,
        abortController,
      }),
    );
  };

  const updateFileProgress = (percentage: number, temporaryId: string) => {
    dispatch(
      updateActiveUploadPercentage({
        temporaryId,
        percentage,
      }),
    );
  };

  const removeActiveUploads = () => {
    dispatch(resetActiveUploads());
  };

  const removeSuccessfulUploads = () => {
    dispatch(resetSuccessfulUploads());
  }

  const cancelActiveUpload = async (temporaryId) => {
    const file = activeUploads.find((activeUpload) => activeUpload.temporaryId === temporaryId);

    if (file.abortController) {
      file.abortController.abort();

      dispatch(
        updateActiveUploadStatus({
          temporaryId,
          status: ActiveUploadStatusEnum.CANCELLED,
        }),
      );
    }
  };

  const uploadFile = ({
    file,
    temporaryId,
    failedFileData,
  }: UploadUserFileInterface): Promise<{ url: string; fileId: string }> =>
    new FileUploader().initiateFileUpload({
      selectedFile: file,
      saveFileMutationOptions: createSaveFileMutationOptions(file),
      fileStatusUpdateMutationOptions: createUpdateFileStatusMutationOptions(),
      onError: (error) => {
        dispatch(
          updateActiveUploadStatus({
            temporaryId,
            status: ActiveUploadStatusEnum.FAILED,
            error,
          }),
        );
      },
      onAfterStart: (data) => {
        dispatch(
          updateActiveUploadDetails({
            temporaryId,
            fileId: data.id,
            uploadUrl: data.uploadUrl,
            contentType: data.contentType,
          }),
        );
      },
      onProgress: (percentage) => updateFileProgress(percentage, temporaryId),
      onBeforeStart: (abortController) =>
        !!failedFileData
          ? resetFileUpload(temporaryId, abortController)
          : addFileUpload(file, temporaryId, abortController),
      onSuccess: (data) => {
        dispatch(
          updateActiveUploadStatus({
            temporaryId,
            status: ActiveUploadStatusEnum.SUCCESS,
          }),
        );

        dispatch(
          addUserFile({
            file: data.updateFileStatus,
          }),
        );
      },
      failedFileData,
    });

  return {
    uploadFile,
    removeActiveUploads,
    cancelActiveUpload,
    restartFailedUpload,
    removeSuccessfulUploads
  };
};
