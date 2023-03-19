import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyAccountUserDialogStyles = makeStyles(() => ({
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dialogContentTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: colors.black,
    textAlign: 'left',
  },
  dialogContentDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    textAlign: 'left',
    marginTop: '13px',
    marginBottom: '13px',
  },
  confirmButton: {
    alignSelf: 'flex-end',
    padding: '5px 20px',
    fontSize: '14px',
    fontWeight: 400,
    color: colors.white,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    boxShadow: 'none',
    borderRadius: '30px',
    textTransform: 'initial',
    letterSpacing: '0.3px',
    '&:hover': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    '&:focus': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.mediumDarkGray,
      color: colors.white,
    },
  },
}));
