import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import clsx from 'clsx';
import { useNavigationStyles } from 'layouts/main/partials/navigation/navigation.styles';
import { NavigationMenu } from 'layouts/main/partials/navigation-menu';
import { useWidth } from 'modules/common/hooks';
import Logo from 'modules/common/icons/logo-light.svg';
import { FunctionComponent } from 'react';

export interface NavigationInterface {
  open: boolean;
  handleDrawerClose: () => void;
}

export const Navigation: FunctionComponent<NavigationInterface> = ({ open, handleDrawerClose }) => {
  const classes = useNavigationStyles();
  const breakpoint = useWidth();

  return (
    <Drawer
      variant={/xs|sm/.test(breakpoint) ? 'temporary' : 'permanent'}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <SvgIcon component={Logo} sx={{ width: 88, height: 28 }} viewBox="0 0 179 92" />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <NavigationMenu />
    </Drawer>
  );
};
