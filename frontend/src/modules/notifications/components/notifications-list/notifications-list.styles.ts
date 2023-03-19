/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useNotificationsListStyles = roqMakeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: theme.spacing(3),
  },
  headline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  showMore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  noNotificationsBlock: {
    marginTop: theme.spacing(3),
  },
  actionItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'timestamp--root': {
    textTransform: 'uppercase',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? 'black' : 'white',
  },
  'unreadBadge--badge': {
    top: 14, // not possible to find proper theme spacing to make it aligned middle: theme.spacing(2),
    right: theme.spacing(-4),
  },
  'closeButton--root': {
    margin: theme.spacing(-0.5),
  },
  markAllRead: {
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    color: theme.palette.mode === 'light' ? 'black' : 'white',
  },
  loadingBlock: {
    marginTop: '20px',
  },
}));
