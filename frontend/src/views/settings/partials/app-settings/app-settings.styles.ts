import { Theme } from '@mui/material';
import { CardClasses } from '@mui/material/Card';
import { CardContentClasses } from '@mui/material/CardContent';
import { CardHeaderClasses } from '@mui/material/CardHeader';
import { roqMakeStyles } from 'modules/common/utils';

export interface AppSettingsClasses {
  card?: CardClasses;
  cardHeader?: CardHeaderClasses;
  cardContent?: CardContentClasses;
}

export const useAppSettingsStyles = roqMakeStyles<AppSettingsClasses>((theme: Theme) => ({
  'card--root': {
    padding: 0,
  },
  'cardHeader--root': {
    margin: theme.spacing(3),
    padding: 0,
  },
  'cardHeader--title': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  'cardContent--root': {
    margin: theme.spacing(3),
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));
