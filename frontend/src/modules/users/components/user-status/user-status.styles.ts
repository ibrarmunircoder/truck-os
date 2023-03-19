/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useUserStatusStyles = roqMakeStyles((theme: Theme) => ({
  statusChip: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(13),
    lineHeight: '18px',
    letterSpacing: '0.16px',
    color: theme.palette.common.white,
  },
  activeChip: {
    background: '#4caf50',
    color: theme.palette.common.white,
  },
  pendingChip: {
    background: '#ed6c02',
    color: theme.palette.common.white,
  },
  canceledChip: {
    background: '#f44336',
    color: theme.palette.common.white,
  },
  acceptedChip: {
    background: '#4caf50',
    color: theme.palette.common.white,
  },
  expiredChip: {
    background: theme.palette.grey[200],
    color: theme.palette.grey[500],
  },
  inactiveChip: {
    background: theme.palette.grey[300],
    color: theme.palette.common.white,
  },
}));
