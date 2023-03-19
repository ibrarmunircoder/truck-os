import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useHeaderStyles } from 'layouts/main/partials/header/header.styles';
import { HeaderMenu } from 'layouts/main/partials/header-menu';
import { useWidth } from 'modules/common/hooks';
import { useMessageCenterProvider } from 'modules/message-center/hooks';
import { FunctionComponent } from 'react';

export type HeaderProps = {
  title?: string | undefined | null
  open: boolean
  handleDrawerOpen: () => void
}

export const Header: FunctionComponent<HeaderProps> = ({ title, open, handleDrawerOpen }) => {
  const classes = useHeaderStyles();
  const width = useWidth()
  useMessageCenterProvider();

  return (
    <AppBar
      elevation={0}
      position="fixed"
      className={clsx(
        classes.appBar,
        /xs|sm/.test(width) ? classes.appBarSmall : classes.appBarLarge,
        open && classes.appBarOpen
      )}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>{title}</Typography>
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
};
