import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useRecordStyles = makeStyles((theme) => ({
  recordCard: {
    border: `1px solid ${colors.lightGray}`,
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '11px',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    cursor: 'pointer',
    backgroundColor: colors.white,
    [theme.breakpoints.up('lg')]: {
      marginBottom: '15px',
    },
  },
  iconSquare: {
    width: '40px',
    height: '40px',
    display: 'flex',
    background: colors.white,
    alignItems: 'center',
    borderRadius: '8px',
    justifyContent: 'center',
  },
  recordDetails: {
    marginLeft: '10px',
    flex: 1,
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80px',
      justifyContent: 'space-between',
    },
  },
  recordHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  recordHeading: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#212324',
    flex: 1,
    marginRight: '8px',
  },
  recordText: {
    color: colors.darkGray,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0.4px',
    fontWeight: 500,
    '& span': {
      lineHeight: '25px',
      fontSize: '15px',
      fontWeight: 500,
    },
  },
  recordAmountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
  },
  recordAmount: {
    color: colors.primary,
    lineHeight: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    [theme.breakpoints.up('lg')]: {
      fontSize: '18px',
    },
  },
  greenBgGradient: {
    background: 'linear-gradient(120.94deg, #99D798 -10.74%, #65A664 107.42%)',
  },
  greyBgGradient: {
    background: 'linear-gradient(120.94deg, #D1D1D1 -10.74%, #585858 107.42%)',
  },
  dialogContentTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.black,
    textAlign: 'center',
  },
  dialogContentPhoneNumber: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    marginBottom: 0,
    color: colors.primary,
    marginTop: '35px',
  },
  dialogContentDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: '13px',
  },
  paymentCardDetail: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  },
  paymentStatusButton: {
    justifyContent: 'flex-start',
    textTransform: 'initial',
    fontWeight: 600,
    letterSpacing: '0.3px',
    marginTop: '7px',
    fontSize: '13px',
    borderRadius: '8px',
    width: 'auto',
    minWidth: '290px',
    '&.Mui-disabled': {
      color: colors.white,
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
    },
  },
  successStatus: {
    border: `2px solid ${colors.primary}`,
    backgroundColor: 'rgb(101 166 100 / 10%)',
    color: colors.primary,
    '&:hover': {
      border: `2px solid ${colors.primary}`,
      backgroundColor: 'rgb(101 166 100 / 10%)',
      color: colors.primary,
    }
  },
  dangerStatus: {
    border: `2px solid ${colors.error}`,
    backgroundColor: 'rgb(245 74 74 / 10%)',
    color: colors.error,
    '&:hover': {
      border: `2px solid ${colors.error}`,
      backgroundColor: 'rgb(245 74 74 / 10%)',
      color: colors.error,
    }
  },
  defaultStatus: {
    fontSize: '15px',
    fontWeight: 500,
    padding: '0',
    border: 'none',
    backgroundColor: `${colors.white} !important`,
    color: colors.darkGray,
    minWidth: 'auto',
    marginTop: '3px',
    '&:hover': {
      border: 'none',
      backgroundColor: `${colors.white} !important`,
      color: colors.darkGray,
    },
    '&.Mui-disabled': {
      color: colors.darkGray,
    }
  }
}));
