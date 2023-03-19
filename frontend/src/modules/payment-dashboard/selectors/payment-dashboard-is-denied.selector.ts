import { StoreInterface } from 'configuration/redux/store';
import { PaymentDashboardStateInterface } from 'modules/payment-dashboard';
import { createSelector } from 'reselect';

export const paymentDashboardIsDeniedSelector = createSelector<
  [(state: StoreInterface) => PaymentDashboardStateInterface],
  boolean
>(
  (state) => state.paymentDashboard,
  (values) => values.isDebtorDenied,
);
