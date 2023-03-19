import { AppDispatch } from 'configuration/redux/store';
import { loginAction } from 'modules/auth/auth.slice';
import { useResetAuthError } from 'modules/auth/hooks';
import { authSelector } from 'modules/auth/selectors';
import { useRouter } from 'modules/common/hooks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface LoginError {
  message: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
  keepMeLoggedIn?: boolean;
}

export interface UseLoginInterface {
  isLoading: boolean;
  error: LoginError;
  handleLogin: (formValues: LoginFormValues) => void;
  resetError: () => void;
}

export const useLogin = (): UseLoginInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const { isLoading, error } = useSelector(authSelector);
  const { resetAuthError: resetError } = useResetAuthError();

  const handleLogin = useCallback(async (formValues: LoginFormValues): Promise<void> => {
    const result = await dispatch(loginAction({ data: formValues }));

    if (result.type === loginAction.fulfilled.toString()) {
      void router.replace('/'); // @todo: consider configurable redirect url?
    } else {
      throw result.payload;
    }
  }, [dispatch, router]);

  return {
    error,
    isLoading,
    handleLogin,
    resetError
  };
};
