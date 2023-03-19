import { StoreInterface } from 'configuration/redux/store';
import { AccountSettingsStateInterface } from 'modules/account-settings';
import { createSelector } from 'reselect';

export const accountSettingsCurrentViewSelector = createSelector<
  [(state: StoreInterface) => AccountSettingsStateInterface],
  number
>(
  (state) => state.accountSettings,
  (values) => values.currentSettingsView,
);
