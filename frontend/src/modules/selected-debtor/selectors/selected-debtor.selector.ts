import { StoreInterface } from 'configuration/redux/store';
import { SelectedDebtorStateInterface } from 'modules/selected-debtor/selected-debtor.slice';
import { createSelector } from 'reselect';

export const selectedDebtorSelector = createSelector<
  [(state: StoreInterface) => SelectedDebtorStateInterface],
  SelectedDebtorStateInterface
>(
  (state) => state.selectedDebtor,
  (values) => values,
);
