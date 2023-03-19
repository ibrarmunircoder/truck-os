import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { SendMessageRequestPayloadInterface } from 'modules/message-center/utils';

export interface UseSendMessageHookInterface {
  send: (message: SendMessageRequestPayloadInterface) => void;
}

export const useSendMessage = (): UseSendMessageHookInterface => {
  const [socket] = useMessageCenterSocket();

  const send = (newMessage: SendMessageRequestPayloadInterface) => {
    socket.sendMessage(newMessage);
  };

  return {
    send,
  };
};
