import { StoreInterface } from 'configuration/redux/store';
import { SingleUserInviteStateInterface, UserInvitesStateInterface } from 'modules/user-invites/user-invites.slice';
import { createSelector } from 'reselect';

export const singleUserInviteSelector = createSelector<
  [(state: StoreInterface) => UserInvitesStateInterface],
  SingleUserInviteStateInterface
>(
  (state: StoreInterface) => state.userInvites,
  (users) => users.single,
);
