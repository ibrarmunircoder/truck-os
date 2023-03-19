import { StoreInterface } from 'configuration/redux/store';
import { VirtualIbnStateInterface } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { createSelector } from 'reselect';

export const virtualIbnSelector = createSelector<
  [(state: StoreInterface) => VirtualIbnStateInterface],
  VirtualIbnStateInterface
>(
  (state) => state.virtualIbn,
  (values) => values,
);
