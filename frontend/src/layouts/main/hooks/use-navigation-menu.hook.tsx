import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { NavigationItemInterface } from 'layouts/main/interfaces';
import { useTranslation } from 'modules/common/hooks';
import React from 'react';
import routes from 'routes';

interface UseNavigationMenuHookInterface {
  navigationMenuItems: NavigationItemInterface[][];
}

export const useNavigationMenu = (): UseNavigationMenuHookInterface => {
  const { t } = useTranslation();

  const iconColor = '#a5aab6';

  const navigationMenuItems: NavigationItemInterface[][] = [
    [
      {
        id: 'home',
        title: t('title_home'),
        href: { route: routes.home },
        icon: (
          <DashboardIcon
            sx={{
              color: iconColor,
            }}
          />
        ),
      },
      {
        id: 'files',
        title: t('title_files'),
        href: { route: routes.files },
        icon: (
          <FolderIcon
            sx={{
              color: iconColor,
            }}
          />
        ),
      },
      {
        id: 'users',
        title: t('title_users'),
        href: { route: routes.users },
        icon: (
          <SupervisedUserCircleIcon
            sx={{
              color: iconColor,
            }}
          />
        ),
      },
    ],
    [
      {
        id: 'settings',
        title: t('title_settings'),
        href: { route: routes.settings },
        icon: (
          <SettingsIcon
            sx={{
              color: iconColor,
            }}
          />
        ),
      },
      {
        id: 'example',
        title: t('title_example'),
        href: { route: routes.exampleAuthors },
        icon: <ScatterPlotIcon />,
      },
    ],
  ];

  return {
    navigationMenuItems,
  };
};
