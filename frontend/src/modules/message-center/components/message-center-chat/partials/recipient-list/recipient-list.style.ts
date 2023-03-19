/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useRecipientListStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '1px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  container: {
    idth: '100%',
    height: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  list: {
    
  },
  'list--root': {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
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
