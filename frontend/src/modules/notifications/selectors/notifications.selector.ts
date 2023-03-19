import { StoreInterface } from 'configuration/redux/store';
import { NotificationsStateInterface } from 'modules/notifications/notifications.slice';
import { createSelector } from 'reselect';

export const notificationsSelector = createSelector<
  [(state: StoreInterface) => NotificationsStateInterface],
  NotificationsStateInterface
>(
  (state) => state.notifications,
  (values) => values,
);
