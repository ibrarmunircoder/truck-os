import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useStatusAlertStyles = makeStyles(() => ({
  alertStatus: {
    '&.MuiAlert-filled': {
      backgroundColor: colors.black,
      padding: 0,
      borderRadius: 0,
    },
    '& .MuiAlert-message': {
      height: '33px',
      padding: '0 12px',
    },
    '& .MuiAlert-action': {
      padding: '7px 16px 7px 0',
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
  },
}));
