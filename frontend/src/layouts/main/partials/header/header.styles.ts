import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { yankeesBlue } from 'configuration/theme/colors';
import { ThemeEnum } from 'modules/theme/enums';

const drawerWidth = 240;

export const useHeaderStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: theme.spacing(1), // keep right padding when drawer closed
    paddingLeft: theme.spacing(0.5),
    marginLeft: 0,
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.white : '#1e293b',
  },
  appBarLarge: {
    zIndex: theme.zIndex.drawer,
    boxShadow: theme.palette.mode === ThemeEnum.LIGHT ? `inset 0px -1px 0px #F4F5F6` : `inset 0px -1px 0px #293445`,
  },
  appBarSmall: {
    zIndex: theme.zIndex.drawer - 1,
  },
  appBarOpen: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    padding: theme.spacing(2, 3),
    color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : theme.palette.common.white,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.common.white,
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
}));
