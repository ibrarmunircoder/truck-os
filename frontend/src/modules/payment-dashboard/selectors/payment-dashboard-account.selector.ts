import { StoreInterface } from 'configuration/redux/store';
import { PaymentDashboardAccountInterface, PaymentDashboardStateInterface } from 'modules/payment-dashboard';
import { createSelector } from 'reselect';

export const paymentDashboardAccountSelector = createSelector<
  [(state: StoreInterface) => PaymentDashboardStateInterface],
  PaymentDashboardAccountInterface
>(
  (state) => state.paymentDashboard,
  (values) => values.account,
);
