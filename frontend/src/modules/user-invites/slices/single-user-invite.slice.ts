import { createSlice } from '@reduxjs/toolkit';
import { cancelUserInviteAction, fetchUserInviteAction, resendUserInviteAction } from 'modules/user-invites/actions';
import { UserInviteInterface } from 'modules/user-invites/interfaces';

export interface SingleUserInviteStateInterface {
  id: string | null;
  isLoading: boolean;
  error: Error;
  isStatusLoading: boolean;
  userInvite: UserInviteInterface;
  // state to remember the previously edited user invite, so that Edit Invite overlay can decide whether to reload the Invites page or not
  previousEditedUserInvite: UserInviteInterface | null;
}

const initialState: SingleUserInviteStateInterface = {
  id: null,
  isLoading: false,
  error: null,
  isStatusLoading: false,
  userInvite: null,
  previousEditedUserInvite: null,
};

const updateUserInviteStatusReducerPending = (state = initialState) => {
  state.isStatusLoading = true;
};

const updateUserInviteStatusReducerError = (state = initialState, action) => {
  state.isStatusLoading = false;
  state.error = action.payload;
};

const resendUserInviteStatusReducerSuccess = (state = initialState, { payload }) => {
  const { status, userToken } = payload;
  state.userInvite.status = status;
  state.userInvite.userToken = userToken;
  state.isStatusLoading = false;
  state.error = null;
  state.previousEditedUserInvite = payload;
};

const cancelUserInviteStatusReducerSuccess = (state = initialState, { payload }) => {
  const { status, statusUpdatedAt } = payload;
  state.userInvite.status = status;
  state.userInvite.statusUpdatedAt = statusUpdatedAt;
  state.isStatusLoading = false;
  state.error = null;
  state.previousEditedUserInvite = payload;
};

const fetchUserInviteReducerPending = (state = initialState, action) => {
  state.isLoading = true;
  state.id = action.meta.arg.variables.id;
  state.userInvite = null;
};

const fetchUserInviteReducerError = (state = initialState, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUserInviteReducerSuccess = (state = initialState, { payload: userInvite }) => {
  state.isLoading = false;
  state.error = null;
  state.userInvite = userInvite;
};

export const singleUserInviteSlice = createSlice({
  name: 'userInvites',
  initialState,
  reducers: {
    updateUserInviteStatusAction: (state = initialState, { payload }) => {
      const { id, status } = payload;

      if (state.userInvite.id === id) {
        state.userInvite.status = status;
        state.error = null;
        state.previousEditedUserInvite = payload;
      }
    },
  },
  extraReducers: {
    [fetchUserInviteAction.pending.type]: fetchUserInviteReducerPending,
    [fetchUserInviteAction.rejected.type]: fetchUserInviteReducerError,
    [fetchUserInviteAction.fulfilled.type]: fetchUserInviteReducerSuccess,
    [resendUserInviteAction.pending.type]: updateUserInviteStatusReducerPending,
    [resendUserInviteAction.rejected.type]: updateUserInviteStatusReducerError,
    [resendUserInviteAction.fulfilled.type]: resendUserInviteStatusReducerSuccess,
    [cancelUserInviteAction.pending.type]: updateUserInviteStatusReducerPending,
    [cancelUserInviteAction.rejected.type]: updateUserInviteStatusReducerError,
    [cancelUserInviteAction.fulfilled.type]: cancelUserInviteStatusReducerSuccess,
  },
});

export const { updateUserInviteStatusAction } = singleUserInviteSlice.actions;

export { fetchUserInviteAction, resendUserInviteAction };
