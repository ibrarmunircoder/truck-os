import { useMessageCenterSocket } from 'modules/message-center/hooks';

export interface UseDeleteMessageHookInterface {
  deleteOne: (id: string) => void;
}

export const useDeleteMessage = (): UseDeleteMessageHookInterface => {
  const [socket] = useMessageCenterSocket();

  const deleteOne = (id: string) => {
    socket.deleteMessage(id);
  };

  return {
    deleteOne,
  };
};
