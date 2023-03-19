import { ActiveUploadStatusEnum } from 'modules/file/enums';
import { FileInterface } from 'modules/user-files/interfaces';
import { userFileListSelector } from 'modules/user-files/selectors';
import { UserFileListActiveUploadsInterface } from 'modules/user-files/user-files.slice';
import { useSelector } from 'react-redux';

export interface UseFilesInterface {
  isLoading: boolean;
  inProgressUploads: UserFileListActiveUploadsInterface[];
  failedUploads: UserFileListActiveUploadsInterface[];
  activeUploads: UserFileListActiveUploadsInterface[];
  successUploads: UserFileListActiveUploadsInterface[];
  files: FileInterface[];
  totalCount: number;
}

export const useUserFiles = (): UseFilesInterface => {
  const state = useSelector(userFileListSelector);
  const {
    isLoading,
    activeUploads,
    files,
    totalCount,
  } = state;

  const inProgressUploads = activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.UPLOADING);
  const failedUploads = activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.FAILED);
  const successUploads = activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.SUCCESS);
  return {
    isLoading,
    inProgressUploads,
    failedUploads,
    activeUploads,
    successUploads,
    files,
    totalCount,
  };
};
