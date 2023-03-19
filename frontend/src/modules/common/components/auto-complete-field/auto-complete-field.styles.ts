import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useAutoCompleteFieldStyles = makeStyles(() => ({
  formControl: {
    marginTop: 0,
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      marginTop: 0,
      borderRadius: '10px',
      paddingTop: '0px',
      paddingLeft: 0,
      paddingBottom: 0,
      '&.Mui-disabled': {
        backgroundColor: colors.lightGray,
      },
      '&.Mui-disabled fieldset': {
        borderColor: 'rgba(15, 23, 42, 0.26)',
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
        '&.Mui-disabled': {
          '-webkit-text-fill-color': 'rgba(15, 23, 42, 0.38)',
        },
      },
      '& .MuiAutocomplete-clearIndicator': {
        color: 'rgba(15, 23, 42, 0.54)',
      },
      '& .MuiAutocomplete-popupIndicator': {
        color: 'rgba(15, 23, 42, 0.54)',
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
    },
  },
  paperBackground: {
    backgroundColor: colors.white,
    color: colors.lightGray3,
    '& .MuiAutocomplete-option.Mui-focused': {
      backgroundColor: 'rgba(15, 23, 42, 0.04)',
    },
    '& .MuiAutocomplete-noOptions': {
      color: 'rgba(15, 23, 42, 0.54)',
    }
  }
}));
