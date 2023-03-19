import { AppDispatch } from 'configuration/redux/store';
import { AuthStateErrorInterface } from 'modules/auth';
import { accountActivateAction } from 'modules/auth/auth.slice';
import { authSelector } from 'modules/auth/selectors';
import { useAsyncEffect, useRouter } from 'modules/common/hooks';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes'


interface UseRestorePasswordInterface {
  error: AuthStateErrorInterface;
  isLoading: boolean;
}

export const useAccountActivate = (token: string): UseRestorePasswordInterface => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector(authSelector);

  const { error, isLoading } = state;

  useAsyncEffect(async () => {
    if (!router.isReady) return;

    const result = await dispatch(accountActivateAction({ data: { token } }));
    if (result.type === accountActivateAction.fulfilled.toString()) {
      await router.push({ route: routes.home });
    }
  }, [token]);

  return {
    error,
    isLoading,
  };
};
