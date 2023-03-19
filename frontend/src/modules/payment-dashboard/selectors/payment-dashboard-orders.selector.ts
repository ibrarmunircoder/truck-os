import { StoreInterface } from 'configuration/redux/store';
import { PaymentDashboardStateInterface } from 'modules/payment-dashboard';
import { OrdersInterface } from 'modules/payment-dashboard/interfaces';
import { createSelector } from 'reselect';

export const paymentDashboardOrdersSelector = createSelector<
  [(state: StoreInterface) => PaymentDashboardStateInterface],
  OrdersInterface
>(
  (state) => state.paymentDashboard,
  (values) => values.orders,
);
