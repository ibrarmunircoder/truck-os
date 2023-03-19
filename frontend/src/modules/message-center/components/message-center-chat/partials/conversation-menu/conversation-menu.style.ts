/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useConversationMenuStyles = roqMakeStyles((theme: Theme) => ({
  'menuItem--root': {
    padding: theme.spacing(1.5, 2),
  },
  'removeMenuItem--root': {
    padding: theme.spacing(1.5, 2),
    color: theme.palette.error.main,
  },
  menuIcon: {
    marginRight: theme.spacing(1.5)
  }
}));


