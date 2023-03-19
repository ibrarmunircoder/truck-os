import { combineReducers } from '@reduxjs/toolkit';
import {
  singleUserInviteSlice,
  SingleUserInviteStateInterface,
  userInviteListSlice,
  UserInviteListStateInterface,
} from 'modules/user-invites/slices';

export { setUserInvitesAction, fetchUserInvitesAction, fetchUserInviteAction } from 'modules/user-invites/slices';

export type { UserInviteListStateInterface, SingleUserInviteStateInterface };

export interface UserInvitesStateInterface {
  list: UserInviteListStateInterface;
  single: SingleUserInviteStateInterface;
}

export default combineReducers({
  list: userInviteListSlice.reducer,
  single: singleUserInviteSlice.reducer,
});
