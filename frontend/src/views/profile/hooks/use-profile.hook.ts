import { useFetchUser } from 'modules/users/hooks';
import { UserInterface } from 'modules/users/interfaces';
import { singleUserSelector } from 'modules/users/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export interface UseUserInterface {
  user: UserInterface | null;
  isLoading: boolean;
  error: Error | null;
}

export const useProfile = (id: string): UseUserInterface => {
  const { fetchUser } = useFetchUser();
  const { user, isLoading, error } = useSelector(singleUserSelector);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return {
    user: user?.id === id ? user : null,
    isLoading,
    error,
  };
};
