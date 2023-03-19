/* eslint-disable @roq/lodash-destructuring-import-is-not-allowed */
import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { ComplexError } from 'modules/common/types';
import { activateUserAction, deactivateUserAction, fetchUserAction } from 'modules/users/actions';
import { UserInterface } from 'modules/users/interfaces';

export enum SingleUserChangeActiveStatusActionEnum {
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
}

export interface SingleUserStateInterface {
  id: string | null;
  isLoading: boolean;
  error: ComplexError | null;
  user: UserInterface;
  // state to remember the previously edited user, so that Edit User overlay can decide whether to reload the Users page or not
  previousEditedUser: UserInterface | null;
}

const initialState: SingleUserStateInterface = {
  id: null,
  isLoading: false,
  error: null,
  user: null,
  previousEditedUser: null,
};

const fetchUserReducerPending = (state = initialState, action) => {
  state.isLoading = true;
  state.id = action.meta.arg.variables.id;
  state.user = null;
};

const fetchUserReducerError = (state = initialState, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUserReducerSuccess = (state = initialState, { payload: user }) => {
  state.isLoading = false;
  state.error = null;
  state.user = user;
};

const changeUserActiveStatusReducerSuccess = (state = initialState, { payload: { active } }) => {
  state.user.active = active;
};

export const singleUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, { payload }) => {
      state.user = payload;
    },
    updateUserAction: (state, { payload }) => {
      if (state.id === payload.id) {
        state.user = { ...state.user, ...payload };
        state.previousEditedUser = payload;
      }
    },
    updateAccountUserAction: (state = initialState, { payload }) => {
      if (state.user?.account?.id === payload.id) {
        state.user = {
          ...state.user,
          account: {
            ...payload.account,
            accountUsers: {
              data: payload.accountUsers,
            },
          },
        };
      }
    },
    deleteAccountUserAction: (state = initialState, { payload }) => {
      const accountUsers = state.user.account?.accountUsers.data.filter((accountUser) => accountUser.id !== payload);
      state.user = {
        ...state.user,
        account: {
          ...state.user.account,
          accountUsers: {
            data: accountUsers,
          },
        },
      };
    },
    updateAccountSolePower: (state = initialState, { payload }) => {
      state.user = {
        ...state.user,
        account: {
          ...state.user.account,
          ...omit(payload, ['__typename']),
        },
      };
    },
    setErrorAction: (state = initialState, { payload }) => {
      state.error = payload;
    },
    resetErrorAction: (state = initialState) => {
      state.error = null;
    },
    clearUserAction: () => initialState,
  },
  extraReducers: {
    [fetchUserAction.pending.type]: fetchUserReducerPending,
    [fetchUserAction.rejected.type]: fetchUserReducerError,
    [fetchUserAction.fulfilled.type]: fetchUserReducerSuccess,
    [activateUserAction.fulfilled.type]: changeUserActiveStatusReducerSuccess,
    [deactivateUserAction.fulfilled.type]: changeUserActiveStatusReducerSuccess,
  },
});

export const {
  setUserAction,
  updateUserAction,
  clearUserAction,
  updateAccountUserAction,
  setErrorAction,
  resetErrorAction,
  deleteAccountUserAction,
  updateAccountSolePower,
} = singleUserSlice.actions;

export { fetchUserAction, activateUserAction, deactivateUserAction };
