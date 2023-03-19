import { Theme } from '@mui/material';
import { CardClasses } from '@mui/material/Card';
import { CardContentClasses } from '@mui/material/CardContent';
import { CardHeaderClasses } from '@mui/material/CardHeader';
import { roqMakeStyles } from 'modules/common/utils';

export interface NotificationPreferencesClasses {
  card?: CardClasses;
  cardHeader?: CardHeaderClasses;
  cardContent?: CardContentClasses;
  cardSubtitle?: string;
}

export const useNotificationPreferencesStyles = roqMakeStyles((theme: Theme) => ({
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
    '.MuiGrid-root > hr': {
      borderTop: theme.palette.divider,
    },
    '.MuiGrid-root:last-child': {
      '> hr': {
        display: 'none',
      },
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));
