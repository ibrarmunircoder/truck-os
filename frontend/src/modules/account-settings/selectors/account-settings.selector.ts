import { StoreInterface } from 'configuration/redux/store';
import { AccountSettingsStateInterface } from 'modules/account-settings';
import { createSelector } from 'reselect';

export const accountSettingsSelector = createSelector<
  [(state: StoreInterface) => AccountSettingsStateInterface],
  AccountSettingsStateInterface
>(
  (state) => state.accountSettings,
  (values) => values,
);
