/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useSelectedConversationMessageHistoryStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: 1,
    margin: theme.spacing(0, 3),
  },
  container: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',

    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
  list: {},
  loader: {
    textAlign: 'center',
    color: theme.palette.grey[600],
    padding: theme.spacing(3),
    '& h4': {
      margin: 0,
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
    },
  },
}));
