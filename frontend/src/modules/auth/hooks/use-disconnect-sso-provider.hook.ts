import { AppDispatch } from 'configuration/redux/store';
import { disconnectProviderAction } from 'modules/auth/auth.slice';
import { useAuth, useLogout } from 'modules/auth/hooks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';


export interface UseDisconnectSsoProviderInterface {
  disconnectSsoProvider: (providerId: string) => void;
}

export const useDisconnectSsoProvider = (): UseDisconnectSsoProviderInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleLogout } = useLogout();
  const { providerId: connectedWithProviderId } = useAuth();

  const disconnectSsoProvider = useCallback(async (providerId: string) => {
    const result = await dispatch(disconnectProviderAction(providerId));

    if (providerId === connectedWithProviderId && result.type === disconnectProviderAction.fulfilled.toString()) {
      await handleLogout();
    }
  }, [ dispatch ])

  return {
    disconnectSsoProvider,
  }
}
