import { Theme } from '@mui/material';
import { PoweredByClasses } from 'layouts/auth/partials/powered-by/powered-by.partial';
import { FooterNavigationClasses } from 'modules/common/components/footer-navigation/footer-navigation.styles';
import { roqMakeStyles } from 'modules/common/utils';

export interface AsideClasses {
  root?: string;
  content?: string;
  footer?: string;
  logo?: string;
  poweredBy?: PoweredByClasses;
  footerNavigation?: FooterNavigationClasses;
}

export const useAsideStyles = roqMakeStyles<AsideClasses>((theme: Theme) => ({
  root: {
    height: '100vh',
    position: 'sticky',
    top: 0,
    color: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '380px',
    paddingBottom: theme.spacing(6)
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('lg')]: {
      margin: theme.spacing(3, 1.5, 3),
    },
  },
  logo: {
    margin: 'auto',
    width: '30%',
    maxWidth: 420,
    height: '75%',
  },
  'footerNavigation--root': {
    margin: theme.spacing(4, 0, 0),
    width: '100%',
    maxWidth: '670px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
}));
