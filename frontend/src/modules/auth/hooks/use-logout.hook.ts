import { AppDispatch } from 'configuration/redux/store';
import { logoutAction } from 'modules/auth/auth.slice';
import { useRouter } from 'modules/common/hooks';
import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { disconnect } from 'modules/message-center/message-center.slice';
import { useDispatch } from 'react-redux';
import routes from 'routes';

interface UseLogoutHookInterface {
  handleLogout: () => void;
}

export const useLogout = (): UseLogoutHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [, close] = useMessageCenterSocket();

  const handleLogout = async () => {
    const result = await dispatch(logoutAction());

    if (result.type === logoutAction.fulfilled.toString()) {
      close();
      await dispatch(disconnect());
      await router.push({ route: routes.login });
    }
  };

  return { handleLogout };
};
