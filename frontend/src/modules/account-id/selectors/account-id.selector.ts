import { StoreInterface } from 'configuration/redux/store';
import { AccountIdStateInterface } from 'modules/account-id/account-id.slice';
import { createSelector } from 'reselect';

export const accountIdSelector = createSelector<
  [(state: StoreInterface) => AccountIdStateInterface],
  AccountIdStateInterface
>(
  (state) => state.accountId,
  (values) => values,
);
