import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { fetchUsersAction } from 'modules/message-center/actions';
import { fetchUserAction } from 'modules/users/actions';
import { UsersOrderEnum, UsersSortEnum, UserStatusEnum } from 'modules/users/enums';
import { singleUserSlice, SingleUserStateInterface, userListSlice, UserListStateInterface } from 'modules/users/slices';

export interface UsersInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
  locale: string;
  optedIn: boolean;
  status: UserStatusEnum;
  lastLogin: {
    timestamp: string;
  };
}

export interface UsersStateInterface {
  isLoading: boolean;
  error: Error;
  users: UsersInterface[];
  totalCount: number;
  limit: number;
  offset: number;
  currentPage: number;
  currentEntity: UsersInterface;
  order: {
    sort: UsersSortEnum;
    order: UsersOrderEnum;
  };
  isUserLoading: boolean;
  userError: Error;
  user: UsersInterface;
  list: UserListStateInterface;
  single: SingleUserStateInterface;
}

const initialState: UsersStateInterface = {
  isLoading: false,
  error: null,
  users: [],
  totalCount: 0,
  limit: 5,
  offset: 0,
  currentPage: 0,
  currentEntity: null,
  order: {
    sort: UsersSortEnum.CREATED_AT,
    order: UsersOrderEnum.ASC,
  },
  isUserLoading: false,
  userError: null,
  user: null,
  list: null,
  single: null,
};

const fetchUserReducerPending = (state = initialState) => {
  state.isUserLoading = true;
};

const fetchUserReducerError = (state = initialState, action) => {
  state.isUserLoading = false;
  state.userError = action.payload;
};

const fetchUserReducerSuccess = (state = initialState, { payload: user }) => {
  state.isUserLoading = false;
  state.userError = null;
  state.user = user;
};

const fetchUsersReducerPending = (state = initialState) => {
  state.isLoading = true;
};

const fetchUsersReducerError = (state = initialState, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUsersReducerSuccess = (state = initialState, { payload: { data, totalCount } }) => {
  state.isLoading = false;
  state.error = null;
  state.totalCount = totalCount;
  state.users = data;
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
      state.users = action.payload;
    },
    setUsersRowsCount: (state, { payload }) => {
      const { rowsCount } = payload;
      state.limit = rowsCount;
    },
    setUsersPagination: (state, { payload }) => {
      const { currentPage, limit } = payload;
      state.offset = currentPage * limit;
      state.currentPage = currentPage;
      state.limit = limit;
    },
    setUsersOrder: (state, { payload }) => {
      const { sort, order } = payload;
      state.order.sort = sort;
      state.order.order = order;
    },
    clearUserAction: (state) => {
      state.isUserLoading = false;
      state.userError = null;
      state.user = null;
    },
  },
  extraReducers: {
    [fetchUsersAction.pending.type]: fetchUsersReducerPending,
    [fetchUsersAction.rejected.type]: fetchUsersReducerError,
    [fetchUsersAction.fulfilled.type]: fetchUsersReducerSuccess,
    [fetchUserAction.pending.type]: fetchUserReducerPending,
    [fetchUserAction.rejected.type]: fetchUserReducerError,
    [fetchUserAction.fulfilled.type]: fetchUserReducerSuccess,
  },
});

export {
  clearUserAction,
  fetchUserAction,
  fetchUsersAction,
  setUserAction,
  setUsersAction,
  setUsersOrder,
  setUsersPagination,
  setUsersRowsCount,
  singleUserSlice,
  updateUserAction,
  userListSlice,
  activateUserAction,
  deactivateUserAction,
  setErrorAction,
  updateAccountUserAction,
  resetErrorAction,
  deleteAccountUserAction,
  setSearchTermAction,
  setUserSearchByAction,
  updateAccountSolePower,
  SingleUserChangeActiveStatusActionEnum,
} from 'modules/users/slices';
export type { UserListStateInterface, SingleUserStateInterface };

export default combineReducers({
  list: userListSlice.reducer,
  single: singleUserSlice.reducer,
});
