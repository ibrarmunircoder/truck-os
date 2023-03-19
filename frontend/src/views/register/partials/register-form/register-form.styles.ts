import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useRegisterFormStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(6)
    }
  },
  passwordValidationErrorsWrapper: {
    marginTop: theme.spacing(6)
  }
}));


