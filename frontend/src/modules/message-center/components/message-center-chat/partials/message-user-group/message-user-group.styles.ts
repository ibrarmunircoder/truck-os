/* eslint-disable @roq/filename-suffix-mismatch, @typescript-eslint/no-explicit-any */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useMessageUserGroupStyles = roqMakeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: ({ isAuthor }: any) => (isAuthor ? 'flex-end' : ''),
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(1.5),
    order: ({ isAuthor }: any) => (isAuthor ? 1 : 2),
    maxWidth: '70%',
    '& a': {
      color: theme.palette.action.link
    }
  },
  avatarWrapper: {
    order: ({ isAuthor }: any) => (isAuthor ? 2 : 1),
    marginRight: ({ isAuthor }: any) => (isAuthor ? null : theme.spacing(2)),
    marginLeft: ({ isAuthor }: any) => (isAuthor ? theme.spacing(2) : null),
  },
  'dateText--root': {
    textAlign: ({ isAuthor }: any) => (isAuthor ? 'right' : 'left'),
  },
  footer: {
    color: theme.palette.grey[500],
    columnGap: theme.spacing(1.5),
    flexDirection: ({ isAuthor }: any) => (isAuthor ? 'row-reverse' : 'row')
  },
}));
