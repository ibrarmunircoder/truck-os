import Drawer from '@mui/material/Drawer';
import { useAuth } from 'modules/auth/hooks';
import { FormAlert } from 'modules/forms/components';
import { NotificationsList } from 'modules/notifications/components/notifications-list';
import { useNotificationsSidebarStyles } from 'modules/notifications/components/notifications-sidebar/notifications-sidebar.styles';
import { useNotifications, useNotificationsActions, useNotificationsLoader, } from 'modules/notifications/hooks';
import { FunctionComponent, useEffect, useState } from 'react';



export const NotificationsSidebar: FunctionComponent = () => {
  const classes = useNotificationsSidebarStyles()
  const { user } = useAuth();
  const { fetchOlderNotifications,  fetchUnreadNotifications, fetchAllNotifications } = useNotificationsLoader({ userId: user?.id });

  const [shouldRender, setRender] = useState<boolean>(false);
  const { notifications, sidebar, unreadCount, notificationsError, totalCount, isNotificationsLoading,unreadToggle, isToggleLoading } = useNotifications();
  const { readNotification, readAllNotifications, unreadNotification, closeNotificationsSidebar } = useNotificationsActions();

  useEffect(() => {
    if (sidebar !== shouldRender) {
      setRender(sidebar);
    }
  }, [sidebar]);

  return (
    <Drawer
      classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}
      open={shouldRender}
      onClose={closeNotificationsSidebar}
      anchor="right"
    >
      {notificationsError && <FormAlert error={notificationsError} />}
      <NotificationsList
        notifications={notifications}
        unreadCount={unreadCount}
        onReadItem={readNotification}
        onUnreadItem={unreadNotification}
        onReadAll={readAllNotifications}
        onClose={closeNotificationsSidebar}
        onShowMore={fetchOlderNotifications}
        onFetchAll={fetchAllNotifications}
        onFetchUnread={fetchUnreadNotifications}
        totalCount={totalCount}
        unreadToggle={unreadToggle}
        isNotificationsLoading={isNotificationsLoading}
        isToggleLoading = {isToggleLoading}
      />
    </Drawer>
  );
};
