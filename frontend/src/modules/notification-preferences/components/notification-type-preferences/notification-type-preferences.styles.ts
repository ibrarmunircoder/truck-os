import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useNotificationTypePreferencesStyles = roqMakeStyles((theme: Theme) => ({
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
  formGroup: {
    flexDirection: 'row',
  },
  inputLabel: {
    width: '50%',
    display: 'block',
    margin: 0,
  },
}));
