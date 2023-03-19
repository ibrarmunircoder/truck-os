/* eslint-disable @roq/filename-suffix-mismatch, @typescript-eslint/no-explicit-any */

import { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { roqMakeStyles } from 'modules/common/utils';

const computeMessageColor = (isDeleted, color, opacity = 0.5): string => (isDeleted ? alpha(color, opacity) : color);

export const useFormattedMessageItemStyles = roqMakeStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  box: {
    padding: theme.spacing(3),
    borderRadius: 4,
    borderTopLeftRadius: ({ isSent, isFirst }: any) => (!isSent && isFirst ? 0 : null),
    borderTopRightRadius: ({ isSent, isFirst }: any) => (isSent && isFirst ? 0 : null),
    backgroundColor: ({ isSent }: any) => theme.palette.grey[isSent ? 900 : 200],
    color: ({ isSent, isDeleted }: any) =>
      computeMessageColor(isDeleted, isSent ? theme.palette.common.white : theme.palette.grey[900]),
    '& p': {
      margin: 0,
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
    },
  },
}));
