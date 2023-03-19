import { Theme } from '@mui/material';
import { AvatarClasses } from '@mui/material/Avatar';
import { ButtonClasses } from '@mui/material/Button';
import { CardClasses } from '@mui/material/Card';
import { CardContentClasses } from '@mui/material/CardContent';
import { CardHeaderClasses } from '@mui/material/CardHeader';
import { blueGrey, metallicSilver } from 'configuration/theme/colors';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export interface ProfileUpdateFormClasses {
  card?: CardClasses;
  cardHeader?: CardHeaderClasses;
  cardContent?: CardContentClasses;
  avatar?: AvatarClasses;
  uploadInput?: string;
  buttonWrapper?: string;
  saveButton?: ButtonClasses;
  editButton?: ButtonClasses;
  cancelButton?: ButtonClasses;
  label?: string;
  field?: string;
  divider?: string;
  userFullName?: string;
  formGroupLabel?: string;
  userLocation?: string;
}

export const useProfileUpdateFormStyles = roqMakeStyles<ProfileUpdateFormClasses>((theme: Theme) => ({
  'card--root': {
    padding: 0,
    marginRight: theme.spacing(3),
    marginBottom: 0,
    [theme.breakpoints.down('xl')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  'cardHeader--root': {
    padding: 0,
  },
  'cardHeader--title': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  'avatar--root': {
    width: 64,
    height: 64,
    filter: 'drop-shadow(0px 4px 16px rgba(13, 28, 70, 0.15))',
  },
  'cardHeader--action': {
    margin: 0,
  },
  'cardContent--root': {
    margin: theme.spacing(3),
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  uploadInput: {
    display: 'none',
  },
  buttonWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  'cancelButton--root': {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  userFullName: {
    fontWeight: 400,
  },
  userLocation: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.6)' : metallicSilver[500],
  },
  formGroupLabel: {
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '16px',
    paddingTop: theme.spacing(1),
  },
  label: {
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.mode === ThemeEnum.LIGHT ? blueGrey[500] : metallicSilver[500],
  },
  field: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
  },
  divider: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? '#293445' : '#eeeeee',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
