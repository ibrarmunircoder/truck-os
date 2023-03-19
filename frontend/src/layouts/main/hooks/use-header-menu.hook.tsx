import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { useTheme as useMaterialTheme } from '@mui/material/styles';
import { MenuItemInterface } from 'layouts/main/interfaces';
import { useAuth, useLogout } from 'modules/auth/hooks';
import { createUserInitials } from 'modules/auth/utils/user-initials';
import { useTheme, useWidth } from 'modules/common/hooks';
import { messageCenterSelector } from 'modules/message-center/selectors';
import { useNotifications, useNotificationsActions } from 'modules/notifications/hooks';
import { ThemeEnum } from 'modules/theme/enums';
import { useTranslation } from 'next-i18next';
import { SyntheticEvent, useMemo } from 'react';
import { useSelector } from 'react-redux';
import routes from 'routes';

export interface UseHeaderMenuValuesInterface {
  classes: { badge: string; accountDropdownMenu: string, accountDropdownMenuMaskLayer: string };
  languagesOpen: boolean;
  hangleLanguageOpen: (event: SyntheticEvent) => void;
}

export interface UseHeaderMenuInterface {
  toolbarMenuItems: MenuItemInterface[];
  dropdownMenuItems: MenuItemInterface[];
}

const notXs = ({ width }) => !/xs/.test(width);

export const useHeaderMenu = (values: UseHeaderMenuValuesInterface): UseHeaderMenuInterface => {
  const { classes, languagesOpen, hangleLanguageOpen } = values;

  const { handleThemeChange } = useTheme();
  const theme = useMaterialTheme();
  const width = useWidth();
  const { t } = useTranslation();
  const { handleLogout } = useLogout();
  const { user } = useAuth();
  const { setNotificationsSidebar } = useNotificationsActions();
  const { sidebar, unreadCount: unreadNotificationsCount } = useNotifications();
  const { unreadCount: unreadMessagesCount } = useSelector(messageCenterSelector);
  const initials = useMemo(() => createUserInitials(user), [user]);

  const items: MenuItemInterface[] = useMemo(
    () => [
      {
        id: 'darkMode',
        title: t('toggle-theme'),
        componentProps: {
          color: 'inherit' as const,
          onClick: handleThemeChange,
        },
        meta: {
          toolbar: notXs,
          dropdown: () => true,
        },
        content: theme.palette.mode === ThemeEnum.LIGHT ? <DarkModeIcon /> : <LightModeIcon />,
      },
      {
        id: 'messages',
        title: t('messages'),
        href: { route: routes.messageCenter },
        componentProps: {
          color: 'inherit',
          sx: {
            ml: -0.5,
          },
        },
        content: (
          <Badge className={classes.badge} badgeContent={unreadMessagesCount} color="error" overlap="circular">
            <ChatBubbleIcon />
          </Badge>
        ),
        meta: {
          toolbar: notXs,
          dropdown: () => true,
        },
      },
      {
        id: 'notifications',
        title: t('notification'),
        componentProps: {
          color: 'inherit' as const,
          onClick: () => setNotificationsSidebar(!sidebar),
          sx: {
            ml: -0.5,
          },
        },
        content: (
          <Badge className={classes.badge} badgeContent={unreadNotificationsCount} color="error" overlap="circular">
            <NotificationsIcon />
          </Badge>
        ),
        meta: {
          toolbar: notXs,
          dropdown: () => true,
        },
      },
      {
        id: 'account',
        title: t('account'),
        componentProps: {
          color: 'inherit' as const,
        },
        content: (
          <Box className={classes.accountDropdownMenuMaskLayer}>
            <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} className={classes.accountDropdownMenu}>
              {initials}
            </Avatar>
          </Box>
        ),
        items: [
          {
            id: 'profile',
            title: t('profile'),
            content: <PersonIcon />,
            href: { route: routes.profile, query: { userId: user.id } },
          },
          {
            id: 'settings',
            title: t('settings'),
            content: <SettingsIcon />,
            href: { route: routes.settings },
          },
          {
            id: 'logout',
            title: t('log-out'),
            content: <LogoutIcon />,
            componentProps: {
              onClick: handleLogout,
            },
          },
        ],
        meta: {
          toolbar: notXs,
          dropdown: () => true,
        },
      },
    ],
    [
      unreadNotificationsCount,
      unreadMessagesCount,
      setNotificationsSidebar,
      handleThemeChange,
      languagesOpen,
      hangleLanguageOpen,
      handleLogout,
    ],
  );

  const toolbarMenuItems = items.filter((x) => x.meta.toolbar({ width }));
  const dropdownMenuItems = items.filter((x) => x.meta.dropdown({ width }));

  return {
    toolbarMenuItems,
    dropdownMenuItems,
  };
};
