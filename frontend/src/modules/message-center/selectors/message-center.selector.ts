import { StoreInterface } from 'configuration/redux/store';
import { MessageCenterStateInterface } from 'modules/message-center';
import { createSelector } from 'reselect';

export const messageCenterSelector = createSelector<
  [(state: StoreInterface) => MessageCenterStateInterface],
  MessageCenterStateInterface
>(
  (state) => state.messageCenter,
  (values) => values,
);
