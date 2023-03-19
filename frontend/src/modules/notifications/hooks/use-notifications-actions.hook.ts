import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import {
  closeNotificationsSidebarAction,
  readAllNotificationsAction,
  readNotificationAction,
  setNotificationsSidebarAction,
  toggleNotificationsSidebarAction,
  unreadNotificationAction,
} from 'modules/notifications/notifications.slice';
import { useDispatch } from 'react-redux';

export interface UseNotificationsActionsInterface {
  readNotification: (id: string) => void;
  unreadNotification: (id: string) => void;
  readAllNotifications: () => void;
  toggleNotificationsSidebar: () => void;
  closeNotificationsSidebar: () => void;
  setNotificationsSidebar: (sidebar: boolean) => void;
}

export const useNotificationsActions = (): UseNotificationsActionsInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const readNotification = (id: string) => {
    void dispatch(
      readNotificationAction({
        mutation: gql`
          mutation MarkAsReadNotificationMutation($id: ID!) {
            markAsReadNotification(id: $id) {
              id
              read
            }
          }
        `,
        variables: { id },
      }),
    );
  };

  const unreadNotification = (id: string) => {
    void dispatch(
      unreadNotificationAction({
        mutation: gql`
          mutation MarkAsUnreadNotificationMutation($id: ID!) {
            markAsUnreadNotification(id: $id) {
              id
              read
            }
          }
        `,
        variables: { id },
      }),
    );
  };
  const readAllNotifications = () => {
    void dispatch(
      readAllNotificationsAction({
        mutation: gql`
          mutation MarkAllAsReadNotification {
            markAllAsReadNotification
          }
        `,
      }),
    );
  };

  const toggleNotificationsSidebar = () => {
    dispatch(toggleNotificationsSidebarAction());
  };

  const closeNotificationsSidebar = () => {
    dispatch(closeNotificationsSidebarAction());
  };

  const setNotificationsSidebar = (sidebar: boolean) => {
    dispatch(setNotificationsSidebarAction(sidebar));
  };

  return {
    readNotification,
    readAllNotifications,
    unreadNotification,
    toggleNotificationsSidebar,
    closeNotificationsSidebar,
    setNotificationsSidebar,
  };
};
