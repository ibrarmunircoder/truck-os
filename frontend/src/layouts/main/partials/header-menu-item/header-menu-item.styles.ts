import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useHeaderMenuItemStyles = makeStyles((theme: Theme) => ({
  listItem: {
    width: 'auto',
    padding: 0,
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.54)' : '#a5aab6',
    '&:last-child': {
      marginLeft: theme.spacing(2),
    },
  },
  displayNone: {
    display: 'none',
  },
}));
