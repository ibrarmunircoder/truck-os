import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useAuthLayoutStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    position: 'relative',
  },
  grid: {
    height: 'auto',
    minHeight: '100%',
    position: 'relative',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  formSide: {
    width: '100%',
    maxWidth: '400px',
    [theme.breakpoints.between('md', 'xl')]: {
      maxWidth: '350px',
    },
    [theme.breakpoints.between('xl', 'xxl')]: {
      maxWidth: '400px',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[200],
    backgroundColor: theme.palette.background.paper,
  },
  noAsideMain: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[200],
    backgroundColor: theme.palette.background.paper,
  },
  back: {
    paddingLeft: theme.spacing(7.5),
    paddingRight: theme.spacing(7.5),
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(15),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));
