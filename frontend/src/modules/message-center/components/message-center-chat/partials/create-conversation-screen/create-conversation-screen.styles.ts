/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useCreateConversationScreenStyles = roqMakeStyles((theme: Theme) => ({
  'title': {
    margin: theme.spacing(0, 0, 2.5, 0)
  },
  'recipientBox': {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  'recipientList': {
    padding: theme.spacing(0),
  },
  'buttonBox': {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
    marginRight: '20px'
  },
  'chooseButton': {
    fontSize: 16,
    lineHeight: '24px',
    padding: theme.spacing(0.75, 2, 0.75, 1.75),
    letterSpacing: theme.spacing(0.1875)
  }
}));


