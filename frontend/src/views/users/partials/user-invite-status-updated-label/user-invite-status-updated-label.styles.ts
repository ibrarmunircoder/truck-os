import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export interface UserInviteStatusUpdatedLabelClasses {
  label?: string;
}

export const useUserInviteStatusUpdatedLabelStyles = roqMakeStyles<UserInviteStatusUpdatedLabelClasses>(
  (theme: Theme) => ({
    label: {
      color: theme.palette.grey[400],
      letterSpacing: 0.15,
    },
  }),
);
