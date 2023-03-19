import { StoreInterface } from 'configuration/redux/store';
import { OrderStateInterface } from 'modules/orders/order.slice';
import { createSelector } from 'reselect';

export const orderSelector = createSelector<
  [(state: StoreInterface) => OrderStateInterface],
  OrderStateInterface
>(
  (state) => state.orders,
  (values) => values,
);
