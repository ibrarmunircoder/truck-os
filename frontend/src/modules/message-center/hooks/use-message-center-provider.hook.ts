import { publicConfig } from 'configuration/app';
import { useAuth } from 'modules/auth/hooks';
import { connected, disconnected, messageReceived, setError } from 'modules/message-center';
import { useCurrentUser, useMessageCenterSocket } from 'modules/message-center/hooks';
import { messageSchema } from 'modules/message-center/schemas';
import { MessageRecieivedResponsePayloadInterface, UserConnectedResponsePayload } from 'modules/message-center/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useMessageCenterProvider = (): void => {
  const { id: userId } = useCurrentUser();
  const { platformAccessToken } = useAuth();

  const dispatch = useDispatch();
  const [socket] = useMessageCenterSocket();

  useEffect(() => {
    if (socket && (platformAccessToken || !publicConfig.platform.gatewayEnabled)) {
      socket.setPlatformToken(publicConfig.platform.gatewayEnabled ? platformAccessToken : process.env.NODE_ENV);
      socket.connect();

      socket.onConnect(handleConnect);
      socket.onDisconnect(handleDisconnect);
      socket.onError(handleError);
      socket.onServerException(handleError);
      socket.onMessageRecieived(handleMessageReceived);

      return () => {
        socket.offConnect(handleConnect);
        socket.offDisconnect(handleDisconnect);
        socket.offError(handleError);
        socket.offMessageRecieived(handleMessageReceived);
        socket.offServerException(handleError);
      };
    }
  }, [socket, platformAccessToken]);

  const handleUserConnected = (payload: UserConnectedResponsePayload) => {
    dispatch(
      connected({
        clientId: socket.getId(),
        unreadCount: payload.unreadCount || 0,
      }),
    );
  };

  const handleConnect = () => {
    socket.authorize({ userId }, handleUserConnected);
  };

  const handleError = (err: Error) => {
    dispatch(setError(err));
  };

  const handleDisconnect = () => {
    dispatch(disconnected());
  };

  const handleMessageReceived = (message: MessageRecieivedResponsePayloadInterface) => {
    dispatch(
      messageReceived({
        message: messageSchema(message, { userId }),
      }),
    );
  };
};
