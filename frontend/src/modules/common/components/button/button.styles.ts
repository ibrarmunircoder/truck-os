import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useButtonStyles = makeStyles(() => ({
  buttonContainedPrimary: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 400,
    color: '#fff',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    boxShadow: 'none',
    borderRadius: '10px',
    textTransform: 'initial',
    letterSpacing: '0.3px',
    height: 'auto',
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
      color: '#fff'
    }
  },
  buttonOutlinedPrimary: {
    textTransform: 'initial',
    '&.MuiButton-outlinedPrimary': {
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 400,
      color: '#7F828B',
      backgroundColor: colors.white,
      borderColor: '#DADADA',
      boxShadow: 'none',
      borderRadius: '10px',
      textTransform: 'initial',
      letterSpacing: '0.3px',
      height: 'auto',
      '&:hover': {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
      },
      '&:focus': {
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray,
      },
    },
  },
}));
