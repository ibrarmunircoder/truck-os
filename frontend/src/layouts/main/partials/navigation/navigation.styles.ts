import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

const drawerWidth = 240;

export const useNavigationStyles = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    minHeight: 56,
    boxShadow: theme.palette.mode === ThemeEnum.LIGHT ? `inset 0px -1px 0px #F4F5F6` : `inset 0px -1px 0px #293445`,
  },
  drawerPaper: {
    background: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.white : '#1e293b',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: theme.zIndex.appBar - 1,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(9),
  },
}));
