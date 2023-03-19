/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';


export const useMessageCenterChatStyles = roqMakeStyles((theme: Theme) => ({
  createNewButtonLabel: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  createNewShortButtonLabel: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  'createButton--root': {
    fontSize: 16,
    padding: theme.spacing(0.75, 1.75, 0.75, 1.5),
    lineHeight: 1.5,
    letterSpacing: theme.spacing(0.1875)
  },
  'createButton--startIcon': {
    padding: theme.spacing(0.5625),
    marginLeft: theme.spacing(0)
  }
}));


