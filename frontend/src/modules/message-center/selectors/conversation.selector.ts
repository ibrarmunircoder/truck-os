import { StoreInterface } from 'configuration/redux/store';
import {
  MessageCenterConversationInfiniteListEntityStateInterface,
  messageCenterConversationsAdapter,
} from 'modules/message-center';
import { createSelector } from 'reselect';

export const conversationSelector = createSelector<
  [(state: StoreInterface) => MessageCenterConversationInfiniteListEntityStateInterface],
  MessageCenterConversationInfiniteListEntityStateInterface
>(
  (state) => state.messageCenter.conversations,
  (values) => values,
);

export const { selectAll: selectAllConversations, selectById: selectConversationById } =
  messageCenterConversationsAdapter.getSelectors<StoreInterface>(conversationSelector);
