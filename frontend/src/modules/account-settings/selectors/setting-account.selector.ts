import { StoreInterface } from 'configuration/redux/store';
import { AccountSettingsStateInterface } from 'modules/account-settings';
import { createSelector } from 'reselect';
import { AccountInterface } from 'views/account-settings/interfaces';


export const settingAccountSelector = createSelector<
  [(state: StoreInterface) => AccountSettingsStateInterface],
  AccountInterface
>(
  (state) => state.accountSettings,
  (values) => values.account,
);
