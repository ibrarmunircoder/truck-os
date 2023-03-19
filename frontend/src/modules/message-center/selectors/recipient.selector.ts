import { StoreInterface } from 'configuration/redux/store';
import {
  messageCenterRecipientsAdapter,
  MessageCenterRecipientsInfiniteListEntityStateInterface,
} from 'modules/message-center';
import { createSelector } from 'reselect';

export const recipientSelector = createSelector<
  [(state: StoreInterface) => MessageCenterRecipientsInfiniteListEntityStateInterface],
  MessageCenterRecipientsInfiniteListEntityStateInterface
>(
  (state) => state.messageCenter.recipients,
  (values) => values,
);

export const { selectAll: selectAllRecipients, selectById: selectRecipientById } =
  messageCenterRecipientsAdapter.getSelectors<StoreInterface>(recipientSelector);
