import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useNotificationCategoryPreferencesStyles = roqMakeStyles((theme: Theme) => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
  },
  cardSubtitle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&.MuiGrid-item': {
      paddingTop: theme.spacing(1),
    },
  },
}));
