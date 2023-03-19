import { createSlice } from '@reduxjs/toolkit';
import { fetchFileAction, updateFileAction } from 'modules/user-files/actions';
import { FileInterface } from 'modules/user-files/interfaces';

export interface SingleUserFileStateInterface {
  id: string | null;
  isLoading: boolean;
  error: Error;
  file: FileInterface;
  // state to remember the previously edited file, so that Edit File overlay can decide whether to reload the Files page or not
  previousEditedFile: FileInterface | null;
}

const initialState: SingleUserFileStateInterface = {
  id: null,
  isLoading: false,
  error: null,
  file: null,
  previousEditedFile: null,
};

const fetchFileReducerPending = (state, action) => {
  state.isLoading = true;
  state.id = action.meta.arg.variables.id;
  state.file = null;
};

const fetchFileReducerError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchFileReducerSuccess = (state, { payload: file }) => {
  state.isLoading = false;
  state.error = null;
  state.file = file;
};
const updateFileReducerSuccess = (state, { payload: file }) => {
  state.isLoading = false;
  state.error = null;
  state.file.name = file.name;
  state.previousEditedFile = file;
};

export const singleUserFileSlice = createSlice({
  name: 'userFile',
  initialState,
  reducers: {
    updateUserFile: (state, { payload }) => {
      const { file } = payload;

      state.file = {
        ...state.file,
        ...file,
      };
      state.previousEditedFile = file;
    },
  },
  extraReducers: {
    [fetchFileAction.pending.type]: fetchFileReducerPending,
    [fetchFileAction.rejected.type]: fetchFileReducerError,
    [fetchFileAction.fulfilled.type]: fetchFileReducerSuccess,
    [updateFileAction.fulfilled.type]: updateFileReducerSuccess,
  },
});

export { fetchFileAction };

export const { updateUserFile } = singleUserFileSlice.actions;

export default singleUserFileSlice.reducer;
