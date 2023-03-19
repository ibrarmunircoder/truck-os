import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { UpdateConversationMembersRequestPayloadInterface } from 'modules/message-center/utils';

export interface UseInviteConversationMembersHookInterface {
  updateConversationMembers: (conversationId: string, memberIds: string[]) => void;
}

export const useInviteConversationMembers = (): UseInviteConversationMembersHookInterface => {
  const [socket] = useMessageCenterSocket();

  const updateConversationMembers = (conversationId: string, memberIds: string[]) => {
    const payload: UpdateConversationMembersRequestPayloadInterface = { conversationId, memberIds };
    socket.updateConversationMembers(payload);
  };

  return {
    updateConversationMembers,
  };
};
