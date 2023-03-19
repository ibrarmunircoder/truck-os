/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';


export const useMentionsPopoverStyles = roqMakeStyles((theme: Theme) => ({
  'wrapper--root': {
    display: 'none',
    position: 'absolute',
    width: theme.spacing(48),
    zIndex: 20,
    overflow: 'hidden',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
}));


