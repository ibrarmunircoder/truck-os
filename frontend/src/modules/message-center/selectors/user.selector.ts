import { StoreInterface } from 'configuration/redux/store';
import { MessageCenterUserInfiniteListEntityStateInterface, messageCenterUsersAdapter } from 'modules/message-center';
import { createSelector } from 'reselect';

export const userSelector = createSelector<
  [(state: StoreInterface) => MessageCenterUserInfiniteListEntityStateInterface],
  MessageCenterUserInfiniteListEntityStateInterface
>(
  (state) => state.messageCenter.users,
  (values) => values,
);

export const { selectAll: selectAllUsers } = messageCenterUsersAdapter.getSelectors<StoreInterface>(userSelector);
