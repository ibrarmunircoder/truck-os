import { useAuth } from 'modules/auth/hooks';
import { messageCenterSelector } from 'modules/message-center/selectors';
import { useSelector } from 'react-redux';

export interface UseMessageCenterHookInterface {
  platformAccessToken: string | null;
  isOnline: boolean;
  error: Error;
  clientId: string | null;
  isLoading: boolean;
}

export const useMessageCenter = (): UseMessageCenterHookInterface => {
  const { isOnline, error, clientId, conversations } = useSelector(messageCenterSelector);
  const { platformAccessToken } = useAuth();

  return {
    platformAccessToken,
    isOnline,
    error,
    clientId,
    isLoading: conversations.isLoading,
  };
};
