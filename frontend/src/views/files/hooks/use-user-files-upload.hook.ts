import { useAuth } from 'modules/auth/hooks';
import { OrderEnum } from 'modules/common/enums';
import { FilesSortEnum } from 'modules/file/enums';
import { useFetchUserFiles } from "modules/user-files/hooks/use-fetch-user-files.hook";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useUserFiles } from 'views/files/hooks//use-user-files.hook';
import { useUserFileUploader } from 'views/files/hooks/use-user-file-uploader.hook';

interface Event<T = EventTarget> {
  target: T;
}

export interface UseUserFilesUploadInterface extends UserFileStateInterface {
  handleSelectedFiles: (evt: Event<HTMLInputElement>) => void;
  handlePageChange: (newPage: number, pageSize: number) => void;
  handleFileUpload: (acceptedFiles: File[]) => void;
  handlePageRowsCountChange: (pageSize: number) => void;
  handleOrderChange: (sort: FilesSortEnum, order: OrderEnum) => void;
}

interface UserFileStateInterface {
  pageNumber: number;
  pageSize: number;
  order: { sort: FilesSortEnum, order: OrderEnum }
}

export const useUserFilesUpload = (): UseUserFilesUploadInterface => {
  const { uploadFile: upload } = useUserFileUploader();
  const { fetchUserFiles } = useFetchUserFiles();
  const { user } = useAuth();
  const [tableState, setTableState] = useState<UserFileStateInterface>({
    pageNumber: 0,
    pageSize: 20,
    order: { sort: FilesSortEnum.createdAt, order: OrderEnum.DESC },
  });
  const { totalCount } = useUserFiles();

  const { pageNumber, pageSize, order } = tableState;

  useEffect(() => {
    fetchUserFiles({
      offset: pageNumber * pageSize,
      limit: pageSize,
      order,
    });
  }, [pageNumber, pageSize, order, totalCount]);

  const handleOrderChange = useCallback((
    sort: FilesSortEnum,
    orderDirection: OrderEnum
  ) => {
    setTableState((ts) => ({
      ...ts,
      order: {
        sort,
        order: orderDirection,
      },
    }));
  }, [setTableState]);

  const handlePageRowsCountChange = useCallback((newPageSize: number) => {
    setTableState((ts) => ({
      ...ts,
      pageSize: newPageSize,
    }));
  }, [setTableState])

  const handlePageChange = useCallback((newPageNumber: number, newPageSize: number) => {
    setTableState((ts) => ({
      ...ts,
      pageNumber: newPageNumber,
      pageSize: newPageSize,
    }));
  }, [setTableState])

  const uploadFile = async (file) => {
    const userId = user.id;
    if (!userId || !file) return;

    await upload({
      file,
      temporaryId: uuidv4(),
    });
  }

  const handleFileUpload = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      void uploadFile(file);
    })
  }, []);

  const handleSelectedFiles = (evt: Event<HTMLInputElement>) => {
    const uploadedFiles: FileList = evt.target.files;
    handleFileUpload(Array.from(uploadedFiles));

    evt.target.value = '';
  }

  return {
    ...tableState,
    handlePageChange,
    handleFileUpload,
    handleSelectedFiles,
    handlePageRowsCountChange,
    handleOrderChange,
  }
}
