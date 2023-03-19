import { AppDispatch } from 'configuration/redux/store';
import { saveAs } from 'file-saver';
import {
  useAsyncOperations,
  UseAsyncOperationsConfigMapInterface,
  UseAsyncOperationsCurrentOperationInterface,
} from 'modules/common/hooks';
import { AsyncOperationConfigInterface, OperationConfirmationInterface } from 'modules/common/interfaces';
import { FileVisibilityStatusEnum } from 'modules/user-files/enums';
import { useDeleteFiles, useUserFileUpdatePublicity } from 'modules/user-files/hooks';
import { FileInterface } from 'modules/user-files/interfaces';
import { decreaseTotalCount, updateUserFile } from 'modules/user-files/slices';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FileOperationNameEnum } from 'views/files/enums';

interface FileOperationsConfigInterface extends UseAsyncOperationsConfigMapInterface {
  deleteFiles: AsyncOperationConfigInterface<FileInterface[]>;
  makeFilePublic: AsyncOperationConfigInterface<FileInterface>;
}

interface UseDeleteUserFileInterface extends OperationConfirmationInterface {
  deleteFiles: (files: FileInterface[]) => void;
  downloadFiles: (files: FileInterface[]) => void;
  selectUserFiles: (files: FileInterface[]) => void;
  makeFilePublic: (file: FileInterface) => void;
  makeFilePrivate: (file: FileInterface) => void;
  currentOperation: UseAsyncOperationsCurrentOperationInterface<FileOperationsConfigInterface,
    keyof FileOperationsConfigInterface> | null;
  resetState: () => void;
  selectedUserFiles: FileInterface[];
}

interface UseFileOperationsInterface {
  onSuccess?: (result?: unknown, operationName?: FileOperationNameEnum) => void;
  onError?: (error: Error, operationName: FileOperationNameEnum) => void;
}

export const useUserFileOperations = ({
  onSuccess,
  onError
}: UseFileOperationsInterface): UseDeleteUserFileInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteFiles } = useDeleteFiles();
  const { changeFilePublicity } = useUserFileUpdatePublicity();
  const [selectedUserFiles, setSelectedUserFiles] = useState<FileInterface[]>([]);

  const downloadFiles = useCallback(async (files: FileInterface[]) => {
    await Promise.all(files.map(async (file) => {
      const response = await fetch(file.url);
      const blob = await response.blob();
      saveAs(blob, file.name);
    }))
  }, []);

  const handleOnSuccess = useCallback((result, operationName) => {
    onSuccess?.(result, operationName)

    if (operationName === FileOperationNameEnum.deleteFiles) {
      setSelectedUserFiles([]);

      dispatch(
        decreaseTotalCount({ decreaseBy: result.length })
      );
    } else if (
      [
        FileOperationNameEnum.makeFilePrivate,
        FileOperationNameEnum.makeFilePublic
      ].includes(operationName)) {
      dispatch(
        updateUserFile({ file: result })
      );
    }
  }, [onSuccess]);

  const {
    initiateOperation,
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
  } = useAsyncOperations({
    operations: {
      [FileOperationNameEnum.deleteFiles]: {
        callback: useCallback((files: FileInterface[]) => deleteFiles(files.map(file => file.id)), [deleteFiles]),
        confirmable: true,
      },
      [FileOperationNameEnum.downloadFiles]: {
        callback: useCallback((files: FileInterface[]) => downloadFiles(files), [downloadFiles]),
        confirmable: false,
      },
      [FileOperationNameEnum.makeFilePublic]: {
        callback: useCallback((file: FileInterface) => changeFilePublicity(file.id, FileVisibilityStatusEnum.public), [changeFilePublicity]),
        confirmable: false,
      },
      [FileOperationNameEnum.makeFilePrivate]: {
        callback: useCallback((file: FileInterface) => changeFilePublicity(file.id, FileVisibilityStatusEnum.private), [changeFilePublicity]),
        confirmable: false,
      },
    },
    onSuccess: handleOnSuccess,
    onError
  });

  return {
    deleteFiles: useCallback(
      (files: FileInterface[]) => initiateOperation(FileOperationNameEnum.deleteFiles, files),
      [initiateOperation]
    ),
    downloadFiles: useCallback(
      (files: FileInterface[]) => initiateOperation(FileOperationNameEnum.downloadFiles, files),
      [initiateOperation]
    ),
    makeFilePublic: useCallback(
      (file: FileInterface) => initiateOperation(FileOperationNameEnum.makeFilePublic, file),
      [initiateOperation]
    ),
    makeFilePrivate: useCallback(
      (file: FileInterface) => initiateOperation(FileOperationNameEnum.makeFilePrivate, file),
      [initiateOperation]
    ),
    selectUserFiles: setSelectedUserFiles,
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
    selectedUserFiles,
  };
}

