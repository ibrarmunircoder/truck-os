import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useFormAlertStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    [theme.breakpoints.up('xs')]: {
      top: 72,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? 'transparent' : 'initial',
    boxShadow: theme.palette.mode === ThemeEnum.LIGHT ? 'unset' : 'initial',
    '& .MuiAlert-icon': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
}));
