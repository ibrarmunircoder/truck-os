import { StoreInterface } from 'configuration/redux/store';
import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { conversationSelector, messageSelector, selectConversationById } from 'modules/message-center/selectors';
import { MarkAsReadUnreadMessagesRequestPayloadInterface } from 'modules/message-center/utils';
import { useSelector } from 'react-redux';

export interface UseReadMessagesHookInterface {
  unreadCount: number;
  readMessages: () => void;
}

export const useReadMessages = (): UseReadMessagesHookInterface => {
  const [socket] = useMessageCenterSocket();
  const { lastTimestamp } = useSelector(messageSelector);
  const { selected: selectedConversation } = useSelector(conversationSelector);

  const unreadCount: number | null = useSelector<StoreInterface, number>(
    (state) => selectConversationById(state, selectedConversation?.id)?.unreadCount,
  );

  const markAsReadUnreadMessages = (payload: MarkAsReadUnreadMessagesRequestPayloadInterface) => {
    socket.markAsReadUnreadMessages(payload);
  };

  const readMessages = () => {
    if (!lastTimestamp) {
      return;
    }

    if (unreadCount > 0) {
      markAsReadUnreadMessages({
        conversationId: selectedConversation.id,
        lastTimestamp,
      });
    }
  };

  return {
    unreadCount,
    readMessages,
  };
};
