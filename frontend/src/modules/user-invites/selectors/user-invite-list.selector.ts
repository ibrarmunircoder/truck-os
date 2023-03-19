import { StoreInterface } from 'configuration/redux/store';
import { UserInviteListStateInterface, UserInvitesStateInterface } from 'modules/user-invites/user-invites.slice';
import { createSelector } from 'reselect';

export const userInviteListSelector = createSelector<
  [(state: StoreInterface) => UserInvitesStateInterface],
  UserInviteListStateInterface
>(
  (state) => state.userInvites,
  (userInvites) => userInvites.list,
);
