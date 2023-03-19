import { createSlice } from '@reduxjs/toolkit';
import { OrderEnum } from 'modules/common/enums';
import { ActiveUploadStatusEnum, FilesSortEnum } from 'modules/file/enums';
import { fetchFilesAction } from 'modules/user-files/actions';
import { FileInterface } from 'modules/user-files/interfaces';

export interface UserFileListActiveUploadsInterface {
  id?: string;
  abortController?: AbortController;
  temporaryId: string;
  name: string;
  size: number;
  percentage: number;
  status: ActiveUploadStatusEnum;
  error: string;
  contentType?: string;
  uploadUrl?: string;
  file?: File;
}

export interface UserFileListStateInterface {
  isLoading: boolean;
  error: Error;
  activeUploads: UserFileListActiveUploadsInterface[];
  files: FileInterface[];
  totalCount: number;
  pageSize: number;
  offset: number;
  currentPage: number;
  currentEntity: FileInterface;
  order: {
    sort: FilesSortEnum;
    order: OrderEnum;
  };
}

const initialState: UserFileListStateInterface = {
  isLoading: false,
  error: null,
  activeUploads: [],
  files: [],
  totalCount: 0,
  pageSize: 20,
  offset: 0,
  currentPage: 0,
  currentEntity: null,
  order: {
    sort: FilesSortEnum.createdAt,
    order: OrderEnum.DESC,
  },
};

const fetchUserFileListReducerPending = (state) => {
  state.isLoading = true;
};

const fetchUserFileListReducerError = (state, action: { payload: Error }) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUserFileListReducerSuccess = (state, { payload: { data, totalCount } }) => {
  state.isLoading = false;
  state.error = null;
  state.totalCount = totalCount;

  state.files = data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
  }));
};

export const userFileListSlice = createSlice({
  name: 'UserFileList',
  initialState,
  reducers: {
    setUserFileListAction: (state, action) => {
      state.files = action.payload;
    },
    addUserFile: (state, action) => {
      const { file } = action.payload;

      state.totalCount++;

      state.files.push({
        ...file,
        createdAt: new Date(file.createdAt),
      });
    },
    addActiveUpload: (state, action) => {
      const { temporaryId, abortController, file } = action.payload;

      state.activeUploads = [
        ...state.activeUploads,
        {
          temporaryId,
          abortController,
          name: file.name,
          size: file.size,
          percentage: 0,
          status: ActiveUploadStatusEnum.UPLOADING,
          error: null,
          file,
        },
      ];
    },
    updateActiveUploadPercentage: (state, action) => {
      const { temporaryId, percentage } = action.payload;
      const fileIndex = state.activeUploads.findIndex((file) => file.temporaryId === temporaryId);

      if (fileIndex >= 0) {
        state.activeUploads[fileIndex].percentage = percentage;
      }
    },
    updateActiveUploadStatus: (state, action) => {
      const { temporaryId, status, error } = action.payload;
      const fileIndex = state.activeUploads.findIndex((file) => file.temporaryId === temporaryId);

      if (fileIndex >= 0) {
        state.activeUploads[fileIndex].status = status;
        state.activeUploads[fileIndex].error = error;
      }
    },
    updateActiveUploadId: (state, action) => {
      const { temporaryId, fileId } = action.payload;
      const fileIndex = state.activeUploads.findIndex((file) => file.temporaryId === temporaryId);

      if (fileIndex >= 0) {
        state.activeUploads[fileIndex].id = fileId;
      }
    },
    updateActiveUploadDetails: (state, action) => {
      const { temporaryId, fileId, uploadUrl, contentType } = action.payload;
      const activeUpload = state.activeUploads.find((item) => item.temporaryId === temporaryId);

      if (activeUpload) {
        Object.assign(activeUpload, {
          id: fileId,
          uploadUrl,
          contentType,
        });
      }
    },
    resetActiveUpload: (state, action) => {
      const { temporaryId, abortController } = action.payload;
      const activeUpload = state.activeUploads.find((item) => item.temporaryId === temporaryId);

      if (activeUpload) {
        Object.assign(activeUpload, {
          abortController,
          percentage: 0,
          status: ActiveUploadStatusEnum.UPLOADING,
        });
      }
    },
    resetActiveUploads: (state) => {
      state.activeUploads = [];
    },
    resetSuccessfulUploads: (state) => {
      state.activeUploads = state.activeUploads.filter((item) => !!item.error);
    },
    setUserFilesRowsCount: (state, { payload }) => {
      const { pageSize } = payload;
      state.pageSize = pageSize;
    },
    setUserFileListPagination: (state, { payload }) => {
      const { currentPage, pageSize } = payload;
      state.offset = currentPage * pageSize;
      state.currentPage = currentPage;
      state.pageSize = pageSize;
    },
    setUserFileListOrder: (state, { payload }) => {
      const { sort, order } = payload;
      state.order.sort = sort;
      state.order.order = order;
    },
    decreaseTotalCount: (state, { payload }) => {
      const { decreaseBy } = payload;
      state.totalCount -= decreaseBy;

      if (state.totalCount > 0 && state.totalCount <= state.currentPage * state.pageSize) {
        state.currentPage--;
      }
    },
  },
  extraReducers: {
    [fetchFilesAction.pending.type]: fetchUserFileListReducerPending,
    [fetchFilesAction.rejected.type]: fetchUserFileListReducerError,
    [fetchFilesAction.fulfilled.type]: fetchUserFileListReducerSuccess,
  },
});

export default userFileListSlice.reducer;

export const {
  setUserFileListAction,
  addUserFile,
  addActiveUpload,
  updateActiveUploadDetails,
  resetActiveUpload,
  resetActiveUploads,
  updateActiveUploadPercentage,
  updateActiveUploadStatus,
  updateActiveUploadId,
  setUserFileListPagination,
  setUserFileListOrder,
  decreaseTotalCount,
  setUserFilesRowsCount,
  resetSuccessfulUploads
} = userFileListSlice.actions;

export { fetchFilesAction };
