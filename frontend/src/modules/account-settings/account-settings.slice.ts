import { createSlice } from '@reduxjs/toolkit';
import { settingsAccountQueryAction } from 'modules/account-settings/actions/settings-account-query.action';
import { AccountInterface } from 'views/account-settings/interfaces';

export interface AccountSettingsStateInterface {
  currentSettingsView: number;
  account: AccountInterface;
  error: null;
  isLoading: boolean;
}

const initialState: AccountSettingsStateInterface = {
  currentSettingsView: 0,
  account: null,
  error: null,
  isLoading: false,
};

const processReducer = (state = initialState) => {
  state.isLoading = true;
};

const errorReducer = (state = initialState, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const updateAccount = (state = initialState, { payload }) => {
  state.account = {
    ...state.account,
    ...(payload.data ? payload.data[0] : {}),
  };
};

export const accountSettingsSlice = createSlice({
  name: 'account-settings',
  initialState,
  reducers: {
    updateAccountSettingsView: (state = initialState, { payload }) => {
      state.currentSettingsView = payload;
    },
  },
  extraReducers: {
    [settingsAccountQueryAction.pending.type]: processReducer,
    [settingsAccountQueryAction.rejected.type]: errorReducer,
    [settingsAccountQueryAction.fulfilled.type]: updateAccount,
  },
});

export default accountSettingsSlice.reducer;

export const { updateAccountSettingsView } = accountSettingsSlice.actions;
