import { combineReducers } from '@reduxjs/toolkit';
import {
  addActiveUpload,
  addUserFile,
  fetchFileAction,
  fetchFilesAction,
  resetActiveUpload,
  resetActiveUploads,
  resetSuccessfulUploads,
  setUserFileListAction,
  setUserFileListOrder,
  setUserFileListPagination,
  singleUserFileSlice,
  SingleUserFileStateInterface,
  updateActiveUploadDetails,
  updateActiveUploadId,
  updateActiveUploadPercentage,
  updateActiveUploadStatus,
  updateUserFile,
  UserFileListActiveUploadsInterface,
  userFileListSlice,
  UserFileListStateInterface
} from 'modules/user-files/slices';

export type {
  UserFileListActiveUploadsInterface,
  UserFileListStateInterface
}

export {
  userFileListSlice,
  setUserFileListAction,
  addUserFile,
  addActiveUpload,
  resetActiveUpload,
  resetActiveUploads,
  updateActiveUploadDetails,
  updateActiveUploadPercentage,
  updateActiveUploadStatus,
  updateActiveUploadId,
  setUserFileListPagination,
  setUserFileListOrder,
  fetchFilesAction,
  fetchFileAction,
  updateUserFile,
  resetSuccessfulUploads
}

export interface UserFilesStateInterface {
  list: UserFileListStateInterface,
  single: SingleUserFileStateInterface;
}

export default combineReducers({
  list: userFileListSlice.reducer,
  single: singleUserFileSlice.reducer
});
