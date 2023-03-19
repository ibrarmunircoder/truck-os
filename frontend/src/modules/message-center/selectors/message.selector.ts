import { StoreInterface } from 'configuration/redux/store';
import {
  MessageCenterMessageInfiniteListEntityStateInterface,
  messageCenterMessagesAdapter,
} from 'modules/message-center';
import { createSelector } from 'reselect';

export const messageSelector = createSelector<
  [(state: StoreInterface) => MessageCenterMessageInfiniteListEntityStateInterface],
  MessageCenterMessageInfiniteListEntityStateInterface
>(
  (state) => state.messageCenter.messages,
  (values) => values,
);

export const { selectById: selectMessageById, selectAll: selectAllMessages } =
  messageCenterMessagesAdapter.getSelectors<StoreInterface>(messageSelector);
