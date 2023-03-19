import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useRestorePasswordFormStyles = makeStyles((theme: Theme) => ({
  tooltip: ({ width }: { width: number }) => ({
    width: width + 2,
    margin: '0 !important',
    background: 'none',
    color: theme.palette.grey[500],
    maxWidth: 'none',
    padding: theme.spacing(1, 0)
  }),
  passwordValidationErrorsWrapper: {
    marginTop: theme.spacing(6)
  }
}))
