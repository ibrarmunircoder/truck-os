import { StoreInterface } from 'configuration/redux/store';
import { NotificationPreferencesStateInterface } from 'modules/notification-preferences/notification-preferences.slice';
import { createSelector } from 'reselect';

export const notificationPreferencesSelector = createSelector<
  [(state: StoreInterface) => NotificationPreferencesStateInterface],
  NotificationPreferencesStateInterface
>(
  (state) => state.notificationPreferences,
  (values) => values,
);
