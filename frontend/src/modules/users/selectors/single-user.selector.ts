import { StoreInterface } from 'configuration/redux/store';
import { SingleUserStateInterface, UsersStateInterface } from 'modules/users/users.slice';
import { createSelector } from 'reselect';

export const singleUserSelector = createSelector<
  [(state: StoreInterface) => UsersStateInterface],
  SingleUserStateInterface
>(
  (state) => state.users,
  (users) => users.single,
);
