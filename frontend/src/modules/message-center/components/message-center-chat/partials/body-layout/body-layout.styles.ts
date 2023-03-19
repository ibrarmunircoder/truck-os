/* eslint-disable @roq/filename-suffix-mismatch */
import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useBodyLayoutStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(3),
    alignItems: 'stretch',
    flexDirection: 'row',
    gap: theme.spacing(3),
    height: 'calc(100vh - 242px)',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: 'calc(100vh - 110px)',
    },
    boxSizing: 'border-box',
  },
  aside: {
    paddingRight: theme.spacing(2),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    [theme.breakpoints.between('md', 'xl')]: {
      minWidth: 310,
      maxWidth: 310,
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: 424,
      maxWidth: 424,
    },
  },
  main: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100vh - 291px)',
    },
    minWidth: 0,
  },
  'mainPaper--root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // padding: theme.spacing(3),
  },
}));
