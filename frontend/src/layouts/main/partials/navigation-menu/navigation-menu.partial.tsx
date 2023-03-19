import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { useNavigationMenu } from 'layouts/main/hooks';
import { NavigationItemInterface } from 'layouts/main/interfaces';
import { useNavigationMenuStyles } from 'layouts/main/partials/navigation-menu';
import { NavigationMenuItem } from 'layouts/main/partials/navigation-menu-item';
import { useRouter } from 'modules/common/hooks';
import { useSidebar } from 'modules/layout/hooks';
import { FunctionComponent } from 'react';
import { UrlObject } from 'url';

export interface NavigationMenuInterface {}

export const NavigationMenu: FunctionComponent<NavigationMenuInterface> = () => {
  const classes = useNavigationMenuStyles();
  const router = useRouter();
  const { navigationMenuItems } = useNavigationMenu();
  const { isOpen: drawerOpen } = useSidebar();

  const isPageSelected = (pathName: string, navMenuItem: NavigationItemInterface) => {
    const url = router.createPath(navMenuItem.href) as UrlObject
    if (navMenuItem.id === 'home') {
      return url.pathname === pathName;
    }
    // append `/` to handle cases like `/us` and `/user`
    return `${pathName}/`.indexOf(`${url.pathname}/`) === 0
  };

  return (
    <>
      {navigationMenuItems.map((group, groupIdx) => (
        <div key={'group' + groupIdx}>
          {groupIdx > 0 && (
            <Box className={classes.dividerMaskLayer}>
              <Divider className={classes.divider} />
            </Box>
          )}
          <List className={drawerOpen ? '' : classes.listCollapsed}>
            {group.map((item) => (
              <NavigationMenuItem key={item.id} {...item} selected={isPageSelected(router.asPath, item)} />
            ))}
          </List>
        </div>
      ))}
    </>
  );
};
