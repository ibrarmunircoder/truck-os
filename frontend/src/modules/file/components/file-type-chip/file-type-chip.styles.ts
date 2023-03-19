/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useFileTypeChipStyles = roqMakeStyles((theme: Theme) => ({
  statusChip: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(10),
    lineHeight: '14px',
    letterSpacing: '0.16px',
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    fontStyle: 'normal',
  },
  public_fileChip: {
    background: 'transparent',
    color: '#ED6C02',
    border: '1px solid rgba(237, 108, 2, 0.5)',
  },
  private_fileChip: {
    background: 'transparent',
    color: '#2196F3',
    border: '1px solid rgba(33, 150, 243, 0.5)',
  },
}));
