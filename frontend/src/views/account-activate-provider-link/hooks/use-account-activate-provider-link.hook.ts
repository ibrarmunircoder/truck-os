import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { AuthStateErrorInterface } from 'modules/auth';
import { accountActivateProviderLinkAction } from 'modules/auth/auth.slice';
import { authSelector } from 'modules/auth/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface AccountActivateProviderLinkValuesInterface {
  token: string | string[];
  provider: string | string[];
}

interface UseAccountActivateProviderLinkHookInterface {
  error: AuthStateErrorInterface;
  isLoading: boolean;
}

export const useAccountActivateProviderLink = (
  token: string | string[],
  provider: string | string[],
): UseAccountActivateProviderLinkHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector(authSelector);

  const { error, isLoading } = state;

  useEffect(() => {
    const handleAccountActivateProviderLinkHook = (values: AccountActivateProviderLinkValuesInterface) =>
      dispatch(
        accountActivateProviderLinkAction({
          mutation: gql`
            mutation accountActivateProviderLinkMutation($data: AuthAccountActivateProviderLinkDto!) {
              accountActivateProviderLink(input: $data)
            }
          `,
          variables: { data: values },
        }),
      );

    if (token) {
      void handleAccountActivateProviderLinkHook({ token, provider });
    }
  }, [token]);

  return {
    error,
    isLoading,
  };
};
