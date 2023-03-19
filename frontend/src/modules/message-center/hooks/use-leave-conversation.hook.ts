import { useMessageCenterSocket } from 'modules/message-center/hooks';

export interface UseLeaveConversationHookInterface {
  leave: (conversationId: string) => void;
}

export const useLeaveConversation = (): UseLeaveConversationHookInterface => {
  const [socket] = useMessageCenterSocket();

  const leave = (conversationId: string) => {
    socket.leaveConversation(conversationId);
  };

  return {
    leave,
  };
};
