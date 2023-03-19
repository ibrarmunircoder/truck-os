import { useMessageCenterSocket } from 'modules/message-center/hooks';

export interface UseArchiveConversationHookInterface {
  archive: (conversationId: string) => void;
}

export const useArchiveConversation = (): UseArchiveConversationHookInterface => {
  const [socket] = useMessageCenterSocket();

  const archive = (conversationId: string) => {
    socket.archiveConversation(conversationId);
  };

  return {
    archive,
  };
};
