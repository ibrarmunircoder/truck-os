import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useMainLayoutStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  breadcrumbsContainer: {
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minHeight: `calc(100vh - 165px)`,
    [theme.breakpoints.down('md')]: {
      minHeight: 'calc(100vh - 200px)',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 236px)',
    },
  },
}));
