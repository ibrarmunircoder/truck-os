import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const usePaymentViewStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 'initial',
  },
  verificationHeader: {
    backgroundColor: '#000000',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    padding: '8px 9px 9px 16px',
    '& p': {
      color: colors.white,
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0.3px',
      '& a': {
        color: colors.white,
        textDecoration: 'underline',
      },
    },
  },
  pageLayout: {
    padding: '12px 18px',
    background: colors.white,
    [theme.breakpoints.up('md')]: {
      padding: '40px 50px 30px 50px',
      maxWidth : '1000px',
      margin: '0 auto'
    },
  },
  formControl: {
    marginTop: 0,
    marginBottom: '8px',
    '& .MuiOutlinedInput-root': {
      marginTop: 0,
      borderRadius: '10px',
      paddingRight: '8px',
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
      marginTop: '3px',
      marginLeft: '15px',
      fontWeight: 500,
      fontSize: '13px',
    },
  },
  sectionHeading: {
    fontSize: '18px',
    lineHeight: '23px',
    fontWeight: 500,
    marginBottom: '15px',
    color: colors.black,
  },
  searchButton: {
    padding: '5px',
    '& svg': {
      width: '1.2rem',
      height: '1.2rem',
    },
  },
  requestLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 11px',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      borderRadius: '10px',
      padding: '6px 11px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    }
  },
  paymentIcon: {
    width: '40px',
    height: '40px',
    background: colors.darkGray,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addRequestIcon: {
    width: '1rem',
    height: '1rem',
    color: colors.darkGray,
  },
  requestText: {
    fontSize: '15px',
    fontWeight: 500,
    color: colors.darkGray,
    lineHeight: 'initial',
    marginLeft: '12px',
    flex: 1,
    textDecoration: 'none',
  },
  statusAlertText: {
    fontSize: '12px',
    fontWeight: 500,
    color: colors.white,
  },
  searchInput:{
    marginBottom: '12px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0px',
    }
  }
}));
