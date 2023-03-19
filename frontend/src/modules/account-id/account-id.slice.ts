import { createSlice } from '@reduxjs/toolkit';

export interface AccountIdStateInterface {
  accountId: string;
  virtualIban: string;
  virtualBic: string;
  companyName: string;
}

const initialState: AccountIdStateInterface = {
  accountId: null,
  virtualIban: null,
  virtualBic: null,
  companyName: null,
};

export const accountIdSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setAccountId: (state, action) => {
      state.accountId = action.payload;
    },
    updateVirtualIban: (state = initialState, { payload }) => {
      state.virtualIban = payload;
    },
    updateVirtualBic: (state = initialState, { payload }) => {
      state.virtualBic = payload;
    },
    updateCompanyName: (state = initialState, { payload }) => {
      state.companyName = payload;
    },
  },
});

export default accountIdSlice.reducer;

export const { setAccountId, updateVirtualIban, updateVirtualBic, updateCompanyName } = accountIdSlice.actions;
