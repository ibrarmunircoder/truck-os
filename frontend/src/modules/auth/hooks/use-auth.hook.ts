import { AuthStateInterface, AuthUserInterface } from 'modules/auth';
import { authSelector } from 'modules/auth/selectors';
import { useSelector } from 'react-redux';

export interface UseAuthHookInterface {
  isInitializing: boolean;
  accessToken: string;
  platformAccessToken: string;
  user: AuthUserInterface;
  providerId: string | null;
  sessionUpdatedAt: number | null;
}

export const useAuth = (): UseAuthHookInterface => {
  const {
    isInitializing,
    accessToken,
    platformAccessToken,
    user,
    providerId,
    sessionUpdatedAt,
  }: AuthStateInterface = useSelector(authSelector);

  return {
    isInitializing,
    accessToken,
    platformAccessToken,
    user,
    providerId,
    sessionUpdatedAt
  };
};
