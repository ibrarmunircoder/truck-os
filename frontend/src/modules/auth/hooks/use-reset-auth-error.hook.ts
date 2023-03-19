import { AppDispatch } from 'configuration/redux/store';
import { resetAuthErrorAction } from 'modules/auth/auth.slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export interface UseLoginInterface {
  resetAuthError: () => void;
}

export const useResetAuthError = (): UseLoginInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const resetAuthError = useCallback(() => {
    void dispatch(resetAuthErrorAction());
  }, [dispatch])

  return { resetAuthError };
};
