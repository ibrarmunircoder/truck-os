/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { AvatarClasses } from '@mui/material/Avatar';
import { roqMakeStyles } from 'modules/common/utils';

export interface MemberAvatarClasses {
  avatar?: AvatarClasses;
}

export const useMemberAvatarStyles = roqMakeStyles<MemberAvatarClasses>((theme: Theme) => ({
  'avatar--root': {
    backgroundColor: theme.palette.secondary.main,
  },
}));


