import { StoreInterface } from 'configuration/redux/store';
import { AccountIdStateInterface } from 'modules/account-id/account-id.slice';
import { createSelector } from 'reselect';

export const accountVirtualBicSelector = createSelector<[(state: StoreInterface) => AccountIdStateInterface], string>(
  (state) => state.accountId,
  (values) => values.virtualBic,
);