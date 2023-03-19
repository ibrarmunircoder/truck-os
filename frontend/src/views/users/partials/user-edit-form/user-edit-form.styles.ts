import { Theme } from '@mui/material';
import { PaperClasses } from '@mui/material/Paper';
import { SwitchClasses } from '@mui/material/Switch';
import { TextFieldClasses } from '@mui/material/TextField';
import { roqMakeStyles } from 'modules/common/utils';

export interface UserEditFormClasses {
  paper?: PaperClasses;
  formSection: string;
  titleSection?: string;
  title?: string;
  statusChip?: string;
  activeChip?: string;
  inactiveChip?: string;
  invitedChip?: string;
  invitationNote?: string;
  switch?: SwitchClasses;
  deactivateUserLabel?: string;
  textField?: TextFieldClasses;
  activationRow?: string;
  statusChangeConfirmationModal?: string;
  statusChangeConfirmationMessage?: string;
  deactivatedLabels?: string;
  deactivatedAtLabel?: string;
  deactivatedUserLabel?: string;
  deactivatedUserLabelFullName?: string;
}

export const useUserEditFormStyles = roqMakeStyles<UserEditFormClasses>((theme: Theme) => ({
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
    color: theme.palette.text.primary,
  },
  invitationNote: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.15,
    color: theme.palette.grey[400],
  },
  'switch--root': {
    marginLeft: -10,
  },
  deactivateUserLabel: {
    color: theme.palette.primary.main,
  },
  activationRow: {
    marginTop: '2.25rem',
  },
  statusChangeConfirmationModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 305,
    padding: '1.5rem',
    wordWrap: 'break-word',
    boxShadow:
      '0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 0.375rem 1.875rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem rgba(0, 0, 0, 0.2)',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.25,
    background: theme.palette.background.default,
  },
  statusChangeConfirmationMessage: {
    marginBottom: '1rem',
    color: theme.palette.text.primary,
  },
  deactivatedLabels: {
    marginTop: '1.5rem',
  },
  deactivatedAtLabel: {
    color: theme.palette.text.disabled,
  },
  deactivatedUserLabel: {
    marginTop: '0.75rem',
  },
  deactivatedUserLabelFullName: {
    fontSize: 'italic',
    color: theme.palette.text.disabled,
  },
}));
