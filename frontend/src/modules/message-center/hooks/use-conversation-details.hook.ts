import { conversationExists, MessageCenterScreenEnum } from 'modules/message-center';
import { useCurrentUser, useFetchMessages, useMessageCenterScreen, useMessageCenterSocket } from 'modules/message-center/hooks';
import { conversationSchema } from 'modules/message-center/schemas';
import { ConversationDetailsResponsePayloadInterface } from 'modules/message-center/utils';
import { useDispatch } from 'react-redux';

export interface UseConversationDetailsHookInterface {
  load: (conversationId: string, successCallback?: () => void) => void;
}

export const useConversationDetails = (): UseConversationDetailsHookInterface => {
  const dispatch = useDispatch();
  const [socket] = useMessageCenterSocket();
  const { id: userId } = useCurrentUser();
  const { initialFetch } = useFetchMessages();
  const { set: setNextScreen } = useMessageCenterScreen();

  const handleConversationDetails = (successCallback?: () => void) => (
    payload: ConversationDetailsResponsePayloadInterface,
  ) => {
    const { conversation } = payload;

    if (!conversation) {
      setNextScreen(MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED);
      return;
    }

    dispatch(
      conversationExists({
        id: conversation.id,
        conversation: conversationSchema(payload.conversation, { userId }),
      }),
    );

    initialFetch(conversation.id);

    if (successCallback) {
      successCallback();
    } else {
      setNextScreen(MessageCenterScreenEnum.CONVERSATION_SELECTED);
    }
  };

  const load = (conversationId, successCallback) => {
    socket.conversationDetails(conversationId, handleConversationDetails(successCallback));
  };

  return {
    load,
  };
};
