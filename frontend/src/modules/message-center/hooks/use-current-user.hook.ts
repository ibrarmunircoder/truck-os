import { useAuth } from 'modules/auth/hooks'

export const useCurrentUser = (): { id: string | null } => {
  const { user } = useAuth();

  return { id: user?.roqIdentifier } || { id: null };
}
