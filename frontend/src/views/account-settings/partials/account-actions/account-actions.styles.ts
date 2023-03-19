import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useAccountActionsStyles = makeStyles(() => ({
  accountActionsContainer: {
    display: 'flex',
    padding: '19px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  accountActionsIcon: {
    width: '20px',
    height: '16px',
    marginRight: '20px',
  },
  accountActionsTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.darkGray,
    marginRight: 'auto',
  },
  accountActionsTitleGreen: {
    color: colors.primary,
  },
}));
