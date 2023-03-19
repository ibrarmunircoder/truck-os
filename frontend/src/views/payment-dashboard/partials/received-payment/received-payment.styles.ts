import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useReceivedPaymentStyles = makeStyles((theme) => ({
  paymentCard: {
    padding: '16px',
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      borderRadius: '10px',
      padding: '26px',
      paddingBottom: '10px',
    }
  },
  greenCard: {
    background: `linear-gradient(120.94deg, #99D798 -10.74%, ${colors.primary} 107.42%)`,
    marginRight: '5px',
    [theme.breakpoints.up('md')]: {
      marginRight: '0px',
      marginBottom: '15px',
      height: 'calc(100% - 15px)',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '10px',
      marginBottom: '0px',
      height: '100%',
    }
  },
  cardbg: {
    position: 'absolute',
    right: 0,
    top: '-15%',
  },
  iconBox: {
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.white,
    borderRadius: '6px',
    [theme.breakpoints.up('md')]: {
      width: '70px',
      height: '70px',
    }
  },
  greenIcon: {
    boxShadow: '0px 10px 10px #73B072',
  },
  amountHeading: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.white,
    marginBottom: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '26px',
      marginTop: '10px',
      marginBottom: '10px',
    }
  },
  paymentText: {
    lineHeight: '20px',
    fontSize: '15px',
    letterSpacing: '0.3px',
    textTransform: 'capitalize',
    [theme.breakpoints.up('md')]: {
      textTransform: 'uppercase'
    }
  },
  receivedText: {
    color: '#D4FFD3',
  },
  amountBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '15px',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between'
    }
  }
}));
