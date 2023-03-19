import { ApolloError } from '@apollo/client';
import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import {
  accountActivateAction,
  accountActivateProviderLinkAction,
  disconnectProviderAction,
  forgotPasswordAction,
  loginAction,
  loginProviderAction,
  logoutAction,
  logoutOnExpiredAction,
  refreshAccessTokenAction,
  registerAction,
  resetAuthErrorAction,
  restorePasswordAction,
} from 'modules/auth/actions';
import { SubmitStateInterface } from 'modules/forms/hooks';

export interface AuthStateErrorInterface extends ApolloError {}

export interface AuthUserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  timezone: string;
  locale: string;
  roqIdentifier: string;
  connectedProviderIds: string[];
  apiKey?: boolean;
}

export interface AuthStateInterface {
  isInitializing: boolean;
  isLoading: boolean;
  error: AuthStateErrorInterface | null;
  accessToken: string | null;
  platformAccessToken: string | null;
  providerId: string | null;
  user: AuthUserInterface | null;
  sessionUpdatedAt: number | null;
  userSettingsState?: SubmitStateInterface | null;
}

const initialState: AuthStateInterface = {
  isInitializing: true,
  isLoading: false,
  error: null,
  accessToken: null,
  platformAccessToken: null,
  providerId: null,
  user: null,
  sessionUpdatedAt: null,
  userSettingsState: null,
};

const processReducer = (state = initialState) => {
  state.isLoading = true;
};

const errorReducer = (state = initialState, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const setSessionData = (state = initialState, session) => {
  state.isLoading = false;
  state.error = null;

  state.accessToken = session?.accessToken || null;
  state.platformAccessToken = session?.platformAccessToken || null;
  state.providerId = session?.providerId || null;
  state.user = session?.user || null;
  state.sessionUpdatedAt = session?.updatedAt;
  state.userSettingsState = null;
};

const successReducer = (state = initialState, { payload }) => setSessionData(state, payload);

const disconnectProviderSuccessReducer = (state = initialState, { meta: { arg } }) => {
  if (state.user?.connectedProviderIds) {
    state.user.connectedProviderIds = state.user.connectedProviderIds.filter((p) => p !== arg);
  }
};

const successReducerWithoutData = (state = initialState) => {
  state.isLoading = false;
  state.error = null;
};

const resetErrorReducer = (state = initialState) => {
  state.error = null;
};

const refreshTokenReducer = (state = initialState, { payload }) => {
  state.accessToken = payload.accessToken;
};

const logoutReducer = () => ({ ...initialState, isInitializing: false });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAction: (state, { payload }) => {
      const { session } = payload;

      state.isInitializing = false;
      setSessionData(state, session);
    },
    updateAuthUserAction: (state, { payload }) => {
      state.user = {
        ...state.user,
        ...omit(payload, ['__typename']),
      };
    },
    setAuthUserSettingsState: (state, { payload }) => {
      state.userSettingsState = payload;
    },
  },
  extraReducers: {
    [loginAction.pending.type]: processReducer,
    [loginAction.rejected.type]: errorReducer,
    [loginAction.fulfilled.type]: successReducerWithoutData,
    [loginProviderAction.pending.type]: processReducer,
    [loginProviderAction.rejected.type]: errorReducer,
    [loginProviderAction.fulfilled.type]: successReducerWithoutData,
    [logoutAction.pending.type]: processReducer,
    [logoutAction.rejected.type]: errorReducer,
    [logoutAction.fulfilled.type]: logoutReducer,
    [registerAction.pending.type]: processReducer,
    [registerAction.rejected.type]: errorReducer,
    [registerAction.fulfilled.type]: successReducer,
    [resetAuthErrorAction.type]: resetErrorReducer,

    [accountActivateAction.pending.type]: processReducer,
    [accountActivateAction.rejected.type]: errorReducer,
    [accountActivateAction.fulfilled.type]: successReducerWithoutData,
    [accountActivateProviderLinkAction.pending.type]: processReducer,
    [accountActivateProviderLinkAction.rejected.type]: errorReducer,
    [accountActivateProviderLinkAction.fulfilled.type]: successReducerWithoutData,

    [disconnectProviderAction.pending.type]: processReducer,
    [disconnectProviderAction.rejected.type]: errorReducer,
    [disconnectProviderAction.fulfilled.type]: disconnectProviderSuccessReducer,

    [forgotPasswordAction.rejected.type]: errorReducer,

    [logoutOnExpiredAction.type]: logoutReducer,
    [refreshAccessTokenAction.type]: refreshTokenReducer,
  },
});

export default authSlice.reducer;

export const { initializeAction, updateAuthUserAction, setAuthUserSettingsState } = authSlice.actions;

export {
  accountActivateAction,
  accountActivateProviderLinkAction,
  loginAction,
  loginProviderAction,
  logoutAction,
  logoutOnExpiredAction,
  refreshAccessTokenAction,
  registerAction,
  resetAuthErrorAction,
  disconnectProviderAction,
  forgotPasswordAction,
  restorePasswordAction,
};
