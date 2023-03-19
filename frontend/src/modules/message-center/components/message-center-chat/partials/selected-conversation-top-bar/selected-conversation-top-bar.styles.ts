/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';


export const useSelectedConversationTopBarStyles = roqMakeStyles((theme: Theme) => ({
  'paper--root': {
    minHeight: 96,
    border: 0,
    borderRadius: 0,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[200],
    borderBottomWidth: 2,
    padding: 0,
  },
  'cardHeader--root': {
    padding: theme.spacing(3, 3, 3, 4),
    marginRight: theme.spacing(0.75)
  },
  'cardHeader--subheader': {
    overflow: 'hidden',
    display: '-webkit-box',
    lineClamp: 1,
    boxOrient: 'vertical'
  }
}));


