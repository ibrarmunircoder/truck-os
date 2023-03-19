import { StoreInterface } from 'configuration/redux/store';
import { LayoutStateInterface } from 'modules/layout/layout.slice';
import { createSelector } from 'reselect';

export const sidebarOpenSelector = createSelector<[(state: StoreInterface) => LayoutStateInterface], boolean>(
  (state) => state.layout,
  (values) => values.sidebarOpen,
);
