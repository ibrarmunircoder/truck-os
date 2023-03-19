import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyBasicInfoStyles = makeStyles(() => ({
  companyBasicInfoFormContainer: {
    padding: '0px 12px',
    marginTop: '10px',
  },
  companyBasicInfoFormRoot: {
    marginTop: '30px',
  },
  companyBasicInfoMobileWrapper: {
    marginBottom: '20px',
  },
  companyBasicInfoMobilePhone: {
    '& .special-label': {
      color: colors.darkGray,
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'Circular Std',
      letterSpacing: '0.3px',
    },
    '& input': {
      width: '100% !important',
      borderRadius: '10px !important',
      padding: '12px 14px 12px 58px !important',
      fontFamily: 'Circular Std',
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
    '& .flag-dropdown .search-box': {
      paddingLeft: '15px !important',
      textTransform: 'capitalize',
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
}));
