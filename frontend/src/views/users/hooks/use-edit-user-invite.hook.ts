import { useFetchUserInvite } from 'modules/user-invites/hooks';
import { UserInviteInterface } from 'modules/user-invites/interfaces';
import { singleUserInviteSelector } from 'modules/user-invites/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export interface UseUserInviteEditInterface {
  userInvite: UserInviteInterface | null;
  isLoading: boolean;
  error: Error | null;
}

export const useEditUserInvite = (id: string): UseUserInviteEditInterface => {
  const { fetchUserInvite } = useFetchUserInvite();
  const { userInvite, isLoading, error } = useSelector(singleUserInviteSelector);

  useEffect(() => {
    if (id) {
      fetchUserInvite(id);
    }
  }, [id]);

  return {
    userInvite,
    isLoading,
    error,
  };
};
