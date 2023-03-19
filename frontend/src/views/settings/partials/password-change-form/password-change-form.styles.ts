import { Theme } from '@mui/material';
import { ButtonClasses } from '@mui/material/Button';
import { CardClasses } from '@mui/material/Card';
import { CardContentClasses } from '@mui/material/CardContent';
import { CardHeaderClasses } from '@mui/material/CardHeader';
import { roqMakeStyles } from 'modules/common/utils';

export interface PasswordChangeFormClasses {
  card?: CardClasses;
  cardHeader?: CardHeaderClasses;
  cardContent?: CardContentClasses;
  gridItem?: string;
  gridContainer?: string;
  formControl?: string;
  tooltip?: string;
  passwordField?: string;
  buttonWrapper?: string;
  title?: string;
  saveButton?: ButtonClasses;
  editButton?: ButtonClasses;
  cancelButton?: ButtonClasses;
}

export const usePasswordChangeFormStyles = roqMakeStyles<PasswordChangeFormClasses>((theme: Theme) => ({
  'card--root': {
    padding: theme.spacing(3, 4),
    overflow: 'initial',
    position: 'relative'
  },
  'cardHeader--root': {
    padding: theme.spacing(0, 0, 2, 0),
    margin: 0
  },
  'cardHeader--action': {
    margin: 0,
  },
  'cardContent--root': {
    margin: 0,
    padding: 0,
    position: 'relative',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  'gridItem': {
    paddingRight: theme.spacing(3),
    paddingLeft: 0
  },
  'gridContainer': {
    marginTop: theme.spacing(2)
  },
  'formControl': {
    width: '100%'
  },
  tooltip: ({ width }: { width: number }) => ({
    width: width + 2,
    margin: '0 !important',
    background: 'none',
    color: theme.palette.grey[500],
    maxWidth: 'none',
    padding: theme.spacing(1, 0)
  }),
  'passwordField': {
    '& > div' : {
      backgroundColor: '#FFFFFF'
    }
  },
  buttonWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    }
  },
  'cancelButton--root': {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    }
  },
}));
