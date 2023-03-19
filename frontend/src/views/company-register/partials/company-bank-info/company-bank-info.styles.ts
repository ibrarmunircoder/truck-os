import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyBankInfoStyles = makeStyles(() => ({
  companyBankInfoDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '10px 0px 20px 0px',
    textAlign: 'justify',
  },
  companyBankInfoCheckboxControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    '& .MuiCheckbox-root': {
      padding: '0px 10px',
    },
  },
  formControl: {
    marginTop: 0,
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      marginTop: 0,
      borderRadius: '10px',
      paddingRight: '8px',
      '&.Mui-disabled': {
        backgroundColor: colors.lightGray,
      },
      '& fieldset': {
        border: `1px solid ${colors.mediumDarkGray}`,
      },
      '&:hover fieldset': {
        borderColor: colors.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
        borderWidth: '1px',
      },
      '&.Mui-error fieldset': {
        borderColor: colors.error,
      },
      '& .MuiInputBase-input': {
        padding: '12px 15px',
        paddingRight: '10px',
        height: 'auto',
        fontSize: '15px',
        color: colors.black,
      },
      '& .MuiInputBase-input[type=number]::-webkit-inner-spin-button, .MuiInputBase-input[type=number]::-webkit-inner-spin-button': {
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        margin: 0,
      },
    },
    '& .MuiFormLabel-root': {
      color: colors.darkGray,
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '0.3px',
      transform: 'translate(18px, 14px) scale(1)',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      transform: 'translate(14px, -7px) scale(0.85)',
    },
    '& .MuiFormLabel-root.MuiFormLabel-filled': {
      transform: 'translate(14px, -7px) scale(0.85)',
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.error,
    },
    '& .MuiFormHelperText-root': {
      marginTop: '0px',
      marginLeft: '15px',
      fontWeight: 500,
      fontSize: '13px',
      color: colors.error,
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: colors.error,
    },
  },
  companyBankInfoFormContainer: {
    padding: '0 12px',
  },
  paymentTermTruckOSTerm: {
    fontWeight: 500,
    fontSize: '14px',
    color: colors.darkGray,
    textDecoration: 'underline',
    margin: '0px 8px',
    cursor: 'pointer',
  },
}));
