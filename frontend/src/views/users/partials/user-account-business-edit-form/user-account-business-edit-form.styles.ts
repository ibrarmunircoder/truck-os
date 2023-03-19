import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useUserAccountBusinessEditFormStyles = makeStyles(() => ({
  companyBasicInfoMobileWrapper: {
    margin: '20px 0px',
  },
  companyBasicInfoMobilePhone: {
    '& .special-label': {
      color: colors.darkGray,
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.3px',
      top: '-20px !important',
    },
    '& input': {
      width: '100% !important',
      borderRadius: '10px !important',
      padding: '12px 14px 12px 58px !important',
      '&:focus': {
        borderColor: `${colors.primary} !important`,
        borderWidth: '1px',
        boxShadow: 'none !important',
      },
      '&:hover': {
        borderColor: `${colors.primary} !important`,
        borderWidth: '1px',
        boxShadow: 'none !important',
      },
    },
  },
  companyBasicInfoPhoneNumberErrorStyles: {
    '& input': {
      borderColor: `${colors.error} !important`,
      '&:hover': {
        borderColor: `${colors.error} !important`,
      },
      '&:focus': {
        borderColor: `${colors.error} !important`,
      },
    },
    '& .special-label': {
      color: colors.error,
    },
  },
  phoneNumberErrorMessage: {
    color: colors.error,
    margin: '5px 0 0 15px',
    fontSize: '13px',
    fontWeight: 500,
  },
  confirmButton: {
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
  cancelButton: {
    padding: '5px 20px',
    fontSize: '14px',
    fontWeight: 400,
    color: colors.white,
    backgroundColor: colors.mediumDarkGray,
    borderColor: colors.mediumDarkGray,
    boxShadow: 'none',
    borderRadius: '30px',
    textTransform: 'initial',
    letterSpacing: '0.3px',
    '&:hover': {
      backgroundColor: colors.darkGray,
      borderColor: colors.darkGray,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.darkGray,
      borderColor: colors.darkGray,
    },
    '&:focus': {
      backgroundColor: colors.darkGray,
      borderColor: colors.darkGray,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.lightGray,
      color: colors.white,
    },
  },
  dialogContentDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    marginTop: '13px',
  },
}));
