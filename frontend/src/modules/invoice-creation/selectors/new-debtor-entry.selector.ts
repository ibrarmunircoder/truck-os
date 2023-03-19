import { StoreInterface } from 'configuration/redux/store';
import { NewDebtorEntryStateInterface } from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import { createSelector } from 'reselect';

export const newDebtorEntrySelector = createSelector<
  [(state: StoreInterface) => NewDebtorEntryStateInterface],
  NewDebtorEntryStateInterface
>(
  (state) => state.newDebtorEntry,
  (values) => values,
);
