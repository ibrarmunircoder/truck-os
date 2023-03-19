import { StoreInterface } from 'configuration/redux/store';
import { UserFileListStateInterface } from 'modules/user-files/slices';
import { UserFilesStateInterface } from 'modules/user-files/user-files.slice';
import { createSelector } from 'reselect';

export const userFileListSelector = createSelector<
  [(state: StoreInterface) => UserFilesStateInterface],
  UserFileListStateInterface
>(
  (state) => state.userFiles,
  (values) => values?.list,
);
