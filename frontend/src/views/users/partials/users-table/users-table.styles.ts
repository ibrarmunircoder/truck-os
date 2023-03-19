import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useUsersTableStyles = roqMakeStyles((theme: Theme) => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    padding: '1.5rem 2rem',
    borderBottom: theme.palette.mode === ThemeEnum.LIGHT ? '1px solid #EEEEEE' : '1px solid #293445',
  },
  topSectionTitle: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    color: theme.palette.primary.main,
  },
  tableIcon: {
    color: theme.palette.secondary.main,
    '&:first-child': {
      marginLeft: -12,
    },
  },
  successLink: {
    color: theme.palette.common.white,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  searchInput: {
    marginRight: '10px',
  },
}));
