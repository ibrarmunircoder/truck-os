/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useNotificationsSidebarStyles = makeStyles((theme: Theme) => ({
  drawerRoot: {
    zIndex: theme.zIndex.drawer + 2000,
  },
  drawerPaper: {
    width: 428,
    backgroundColor: theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
    padding: theme.spacing(3),
  },
}));
