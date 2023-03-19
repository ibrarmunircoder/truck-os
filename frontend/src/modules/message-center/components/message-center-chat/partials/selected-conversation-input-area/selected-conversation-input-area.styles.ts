/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';


export const useSelectedConversationInputAreaStyles = roqMakeStyles((theme: Theme) => ({
  'wrapper': {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  textarea: {
    overflowWrap: 'break-word',
    maxHeight: '192px',
    overflow: 'scroll',
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
    borderWidth: 1,
    borderRadius: 4,
    padding: theme.spacing(1.5, 3),
    position: 'relative',
    resize: 'none',
    outline: 'none',
    '& a': {
      color: theme.palette.action.link
    }
  },
  sendButton: {
    marginLeft: theme.spacing(1),
  },
}));


