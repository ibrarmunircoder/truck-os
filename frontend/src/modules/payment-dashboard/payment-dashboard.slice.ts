import { createSlice } from '@reduxjs/toolkit';
import { AccountKycStatusEnum } from 'modules/company-register/enum';
import { paymentDashboardAccountQuery } from 'modules/payment-dashboard/actions';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { groupOrderByOrderDebtorStatus, sortOrderByDateField } from 'modules/payment-dashboard/utils';

const CREATED_AT = 'createdAt';
const DELIVERY_DATE = 'deliveryDate';
const PAID_GROUP_FIELD = 'paid';

export interface PaymentDashboardAccountInterface {
  id: string;
  vatId?: string;
  kycStatus: AccountKycStatusEnum;
}
export interface PaymentDashboardStateInterface {
  isDebtorDenied: boolean;
  orders: OrdersInterface;
  account: PaymentDashboardAccountInterface;
  isLoading: boolean;
  error: null;
}

const initialState: PaymentDashboardStateInterface = {
  isDebtorDenied: false,
  orders: { totalCount: 0, data: [] },
  account: null,
  isLoading: false,
  error: null,
};

const processReducer = (state = initialState) => {
  state.isLoading = true;
};

const errorReducer = (state = initialState, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const updateAccount = (state = initialState, { payload }) => {
  state.account = payload && payload.data.length ? payload.data[0] : null;
};

export const paymentDashboardSlice = createSlice({
  name: 'payment-dashboard',
  initialState,
  reducers: {
    updateIsDebtorDenied: (state = initialState, { payload }) => {
      state.isDebtorDenied = payload;
    },
    updateOrders: (state = initialState, { payload }) => {
      const data = payload && payload.data ? [...payload.data] : [];
      const groupOrderByOrderDebtorStatusData = groupOrderByOrderDebtorStatus(data);
      const sortedOrders = Object.keys(groupOrderByOrderDebtorStatusData)
        .map((key: string) => {
          const orderGroup = groupOrderByOrderDebtorStatusData[key];
          const sortField = key === PAID_GROUP_FIELD ? DELIVERY_DATE : CREATED_AT;
          orderGroup.sort(sortOrderByDateField(sortField));
          return orderGroup;
        })
        .flat();

      state.orders = {
        ...payload,
        data: sortedOrders,
      };
    },
  },
  extraReducers: {
    [paymentDashboardAccountQuery.pending.type]: processReducer,
    [paymentDashboardAccountQuery.rejected.type]: errorReducer,
    [paymentDashboardAccountQuery.fulfilled.type]: updateAccount,
  },
});

export default paymentDashboardSlice.reducer;

export const { updateIsDebtorDenied, updateOrders } = paymentDashboardSlice.actions;
