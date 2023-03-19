import { AppDispatch } from 'configuration/redux/store';
import { loginProviderAction } from 'modules/auth/auth.slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export interface UseLoginProvidersInterface {
  handleSsoProviderLogin: (provider: string, locale: string) => void;
}

export const useSsoProviderLogin = (): UseLoginProvidersInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSsoProviderLogin = useCallback((provider: string, locale: string): void => {
    void dispatch(loginProviderAction({ provider, locale }))
  }, [])

  return {
    handleSsoProviderLogin,
  }
}
