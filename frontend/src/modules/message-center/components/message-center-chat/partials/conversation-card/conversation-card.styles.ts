/* eslint-disable @roq/filename-suffix-mismatch, @typescript-eslint/no-explicit-any */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useConversationCardStyles = roqMakeStyles((theme: Theme) => ({
  'card--root': {
    [theme.breakpoints.up('xl')]: {
      width: 400,
    },
    height: 152,
    width: 286,
    borderRadius: 4,
    backgroundColor: ({ selected }: any) =>
      selected && theme.palette.mode === 'dark' ? theme.palette.grey[500] : null,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[200],
    },
    padding: theme.spacing(3),
  },
  'cardHeader--root': {
    padding: 0,
  },
  'cardHeader--avatar': {
    marginRight: theme.spacing(1),
  },
  'cardHeader--title': {
    textOverflow: 'ellipsis',
    maxHeight: 45,
    overflow: 'hidden',
  },
  'cardHeader--action': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(0.25, 0.25, 0, 0),
  },
  actions: {
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
  'cardContent--root': {
    position: 'relative',
    padding: 0,
    marginTop: theme.spacing(2),
    '& p': {
      margin: 0,
    },
  },
  'avatarGroup--root': {
    marginLeft: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  'unreadBadge--badge': {
    color: theme.palette.common.white,
    backgroundColor: '#FDA4AF',
    borderRadius: theme.spacing(2),
    minWidth: theme.spacing(4),
    minHeight: theme.spacing(4),
    position: 'unset',
    transform: 'unset',
  },
  'lastMessage--root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: 40,
    '& a': {
      color: theme.palette.action.link,
    },
  },
}));
