/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useConversationListStyles = roqMakeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '165px',
    maxHeight: '100%',
    overflowX: 'scroll',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  'list--root': {
    display: 'flex',
    gap: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
  },
  listItem: {
    overflow: 'hidden',
  },
  infiniteScroll: {
    minHeight: '100%',
  },
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
