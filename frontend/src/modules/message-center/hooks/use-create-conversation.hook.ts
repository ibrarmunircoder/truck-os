import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { CreateConversationRequestPayloadInterface } from 'modules/message-center/utils';

export interface UseCreateConversationHookInterface {
  create: (newConversation: CreateConversationRequestPayloadInterface) => void;
}

export const useCreateConversation = (): UseCreateConversationHookInterface => {
  const [socket] = useMessageCenterSocket();

  const create = (newConversation: CreateConversationRequestPayloadInterface) => {
    socket.createConversation(newConversation);
  };

  return {
    create,
  };
};
