import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useLoginFormStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  keepMeLoggedInLabel: {
    '& .MuiTypography-root': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(14),
      fontStyle: 'normal',
      fontWeight: 400,
    },
  },
  keepMeLoggedInCheckbox: {
    '&.Mui-checked': {
      color: theme.palette.mode === 'light' ? theme.palette.common.black : '#2fbdea',
      opacity: theme.palette.mode === 'light' ? 0.87 : 1,
    },
  },
  forgotPassword: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(14),
    fontStyle: 'normal',
    fontWeight: 400,
  },
  loginButton: {
    fontSize: '0.8750rem',
  },
  registerButton:{
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}));
