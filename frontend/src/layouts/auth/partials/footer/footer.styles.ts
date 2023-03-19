import { Theme } from '@mui/material';
import { PoweredByClasses } from 'layouts/auth/partials/powered-by/powered-by.partial';
import { FooterNavigationClasses } from 'modules/common/components/footer-navigation/footer-navigation.styles';
import { roqMakeStyles } from 'modules/common/utils';

export interface FooterClasses {
  root: string;
  content: string;
  poweredBy: PoweredByClasses;
  footerNavigation: FooterNavigationClasses;
}

export const useFooterStyles = roqMakeStyles<FooterClasses>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4, 4, 3 ),
  },
  content: {
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
    },
  },
  'poweredBy--root': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
  },
  'footerNavigation--root': {
    margin: theme.spacing(1.5, 0, 0),
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}));
