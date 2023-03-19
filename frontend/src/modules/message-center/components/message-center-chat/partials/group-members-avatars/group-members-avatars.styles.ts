/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { AvatarGroupClasses } from '@mui/material/AvatarGroup';
import { roqMakeStyles } from 'modules/common/utils';
import { MemberAvatarClasses } from 'modules/message-center/components/message-center-chat/partials/member-avatar/member-avatar.styles';

export interface GroupMembersAvatarsClasses {
  avatarGroup?: AvatarGroupClasses;
  memberAvatar?: MemberAvatarClasses;
}

export const useGroupMembersAvatarsStyles = roqMakeStyles<GroupMembersAvatarsClasses>((theme: Theme) => ({
  'avatarGroup--root': {
    alignItems: 'center',
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('xl')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  'avatarGroup--avatar': {
    backgroundColor: theme.palette.primary.light,
    width: 48,
    height: 48,
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.contrastText
  },
  'memberAvatar--avatar--root': {
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up('xl')]: {
      marginLeft: theme.spacing(-1),
    },
    [theme.breakpoints.down('xl')]: {
      marginLeft: theme.spacing(-2)+'!important',
    },
    color: theme.palette.primary.contrastText
  },
}));


