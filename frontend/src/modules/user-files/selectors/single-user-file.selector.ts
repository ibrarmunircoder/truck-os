import { StoreInterface } from 'configuration/redux/store';
import { SingleUserFileStateInterface } from 'modules/user-files/slices';
import { UserFilesStateInterface } from 'modules/user-files/user-files.slice';
import { createSelector } from 'reselect';

export const singleUserFileSelector = createSelector<
  [(state: StoreInterface) => UserFilesStateInterface],
  SingleUserFileStateInterface
>(
  (state: StoreInterface) => state.userFiles,
  (values) => values?.single,
);
