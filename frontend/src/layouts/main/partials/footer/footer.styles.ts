import { Theme } from '@mui/material';
import { blueGrey } from 'configuration/theme/colors';
import { FooterNavigationClasses } from 'modules/common/components/footer-navigation/footer-navigation.styles';
import { roqMakeStyles } from 'modules/common/utils';

export interface FooterClasses {
  root: string;
  copyright: string;
  footerNavigation: FooterNavigationClasses;
}

export const useFooterStyles = roqMakeStyles<FooterClasses>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : blueGrey[800],
    margin: theme.spacing(3, 3, 0),
    padding: theme.spacing(2, 0, 0),
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(3, 0, 0),
    },
    height: '65px',
  },
  copyright: {
    margin: theme.spacing(0),
    whiteSpace: 'nowrap',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
    },
  },
  'footerNavigation--root': {
    margin: theme.spacing(0, 0, 3),
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}));
