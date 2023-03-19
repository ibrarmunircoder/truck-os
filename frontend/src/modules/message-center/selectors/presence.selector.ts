import { StoreInterface } from 'configuration/redux/store';
import { messageCenterPresenceAdapter, MessageCenterPresenceEntityStateInterface } from 'modules/message-center';
import { createSelector } from 'reselect';

export const precenceSelector = createSelector<
  [(state: StoreInterface) => MessageCenterPresenceEntityStateInterface],
  MessageCenterPresenceEntityStateInterface
>(
  (state) => state.messageCenter.presence,
  (values) => values,
);

export const { selectAll: selectAllPresences, selectById: selectPresenceById } =
  messageCenterPresenceAdapter.getSelectors<StoreInterface>(precenceSelector);
