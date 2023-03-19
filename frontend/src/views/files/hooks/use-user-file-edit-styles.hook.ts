import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useUserFileEditStyles = roqMakeStyles((theme: Theme) => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  topSectionTitle: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    color: theme.palette.primary.main,
  },
  formSection: {
    paddingBottom: '1.125rem',
  },
}));
