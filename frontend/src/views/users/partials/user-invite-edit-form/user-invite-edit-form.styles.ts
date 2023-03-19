import { Theme } from '@mui/material';
import { PaperClasses } from '@mui/material/Paper';
import { TextFieldClasses } from '@mui/material/TextField';
import { roqMakeStyles } from 'modules/common/utils';

export interface UserInviteEditFormClasses {
  paper?: PaperClasses;
  formSection: string;
  titleSection?: string;
  title?: string;
  status?: string;
  invitationCancelSection?: string;
  textField?: TextFieldClasses;
}

export const useUserInviteEditFormStyles = roqMakeStyles<UserInviteEditFormClasses>((theme: Theme) => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
  },
  formSection: {
    paddingTop: '1.25rem',
    paddingBottom: '1.125rem',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    marginRight: '1rem',
    color: theme.palette.text.primary,
  },
  status: {},
  invitationCancelSection: {
    marginTop: '2.25rem',
  },
}));
