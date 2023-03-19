/* eslint-disable @roq/filename-suffix-mismatch */
import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useUserInvitesTableStyles = roqMakeStyles((theme: Theme) => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    padding: '1.5rem 2rem',
  },
  topSectionTitle: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    color: theme.palette.primary.main,
  },
  emailLink: {
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '0.15px',
    color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.black : theme.palette.common.white,
  },
  tableIcon: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
    '&:first-child': {
      marginLeft: -12,
    },
  },
  successLink: {
    color: theme.palette.common.white,
    textDecoration: 'underline',
  },
}));
