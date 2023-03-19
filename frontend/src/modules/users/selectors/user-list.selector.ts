import { StoreInterface } from 'configuration/redux/store';
import { UserListStateInterface, UsersStateInterface } from 'modules/users/users.slice';
import { createSelector } from 'reselect';

export const userListSelector = createSelector<
  [(state: StoreInterface) => UsersStateInterface],
  UserListStateInterface
>(
  (state) => state.users,
  (users) => users.list,
);
