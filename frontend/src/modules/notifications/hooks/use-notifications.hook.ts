import { NotificationsErrorInterface, NotificationsInterface } from 'modules/notifications/notifications.slice';
import { notificationsSelector } from 'modules/notifications/selectors';
import { useSelector } from 'react-redux';

export interface UseNotificationsInterface {
  notifications: NotificationsInterface[];
  unreadCount: number;
  sidebar: boolean;
  notificationsError: NotificationsErrorInterface;
  totalCount: number;
  isNotificationsLoading: boolean;
  unreadToggle: boolean;
  isToggleLoading: boolean;
}

export const useNotifications = (): UseNotificationsInterface => {
  const state = useSelector(notificationsSelector);
  const {
    notifications,
    sidebar,
    notificationsError,
    totalCount,
    unreadCount,
    isNotificationsLoading,
    unreadToggle,
    isToggleLoading,
  } = state;

  return {
    notifications,
    sidebar,
    unreadCount,
    notificationsError,
    totalCount,
    isNotificationsLoading,
    unreadToggle,
    isToggleLoading,
  };
};
