import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useLoginProvidersStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.between('md', 'xl')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.only('xl')]: {
      paddingBottom: theme.spacing(6),
    },
  },
  button: {
    color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
    fontWeight: 500,
    opacity: 0.87,
    width: '100%',
    lineHeight: '24px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    height: '48px',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1.5),
    },
    border: theme.palette.mode === 'light' ? '1px solid #eeeeee' : 'unset',
    borderRadius: '4px',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : '#313e52',
  },
}));
