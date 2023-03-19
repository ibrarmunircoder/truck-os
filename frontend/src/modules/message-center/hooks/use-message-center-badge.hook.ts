import { messageCenterSelector } from 'modules/message-center/selectors';
import { useSelector } from 'react-redux';

export interface UseMessageCenterBadgeHookInterface {
  unreadCount: number;
}

export const useMessageCenterBadge = (): UseMessageCenterBadgeHookInterface => {
  const { unreadCount } = useSelector(messageCenterSelector)

  return {
    unreadCount
  }
};
