import { Theme } from '@mui/material';
import { LinkClasses } from '@mui/material/Link';
import { roqMakeStyles } from 'modules/common/utils';

export interface FooterNavigationClasses {
  root?: string;
  link?: LinkClasses;
}

export const useFooterNavigationStyles = roqMakeStyles<FooterNavigationClasses>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    listStyleType: 'none',
    paddingLeft: 0,
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'center',
    },
  },
  'link--root': {
    color: '#a5aab6',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    padding: theme.spacing(0, 1),
  },
}));
