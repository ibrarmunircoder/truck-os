import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const usePaymentTermStyles = makeStyles<Theme, Props>(() => ({
  confirmTitle: {
    marginBottom: '20px',
    fontSize: '15px',
    fontWeight: 500,
    color: colors.black,
  },
  tooltip: {
    lineHeight: '20px',
    marginLeft: '20px',
    borderRadius: '8px',
    color: colors.black,
    padding: '10px',
    fontWeight: 600,
    fontSize: '12px',
    backgroundColor: colors.lightPrimary,
  },
  paymentText: {
    fontSize: '15px',
    fontWeight: 500,
    color: colors.black,
    margin: '0px 15px',
    lineHeight: 'inherit',
  },
  dataItem: {
    minWidth: '135px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: 600,
    color: colors.black,
    fontSize: '14px',
    padding: '12px 16px',
    backgroundColor: (props) => (props.isDesktop ? colors.mediumDarkGray : colors.lightPrimary),
  },
  listItem: {
    display: 'flex',
    padding: 0,
    marginBottom: '25px',
    justifyContent: 'space-between',
  },
  infoIcon: {
    fontSize: '15px',
    color: colors.darkGray,
    position: 'relative',
    top: '3px',
  },
  receiveTitle: {
    margin: (props) => (props.isDesktop ? '0px 15px' : '0px 0px 5px'),
    fontSize: '15px',
    fontWeight: 500,
    color: colors.black,
    lineHeight: 'inherit',
    textAlign: (props) => (props.isDesktop ? 'inherit' : 'center'),
  },
  amountView: {
    backgroundColor: colors.primary,
    borderRadius: '10px',
    overflow: 'hidden',
    maxWidth: '185px',
    minWidth: '185px',
    minHeight: '70px',
    padding: '10px',
    margin: (props) => (props.isDesktop ? '0' : '0 auto'),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
  },
  leftCircle: {
    top: '-52px',
    left: '-50px',
    bottom: '5px',
    opacity: 0.2,
    position: 'absolute',
    transform: 'rotate(220deg)',
    width: '120px',
    height: '120px',
  },
  rightCircle: {
    top: 0,
    right: '-53px',
    bottom: '5px',
    opacity: 0.2,
    position: 'absolute',
    width: '120px',
    height: '120px',
  },
  amountText: {
    color: colors.white,
    fontSize: '22px',
    fontWeight: 500,
  },
  stepButton: {
    padding: '14px 20px',
    fontSize: '16px',
    fontWeight: 400,
    color: colors.white,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    boxShadow: 'none',
    borderRadius: '10px',
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
  paymentBox: {
    background: colors.white,
    border: (props) => (props.isDesktop ? `1px solid ${colors.lightGray}` : 'none'),
    boxShadow: (props) => (props.isDesktop ? '0px 20px 30px rgba(0, 0, 0, 0.05)' : 'none'),
    borderRadius: (props) => (props.isDesktop ? '10px' : '0'),
    padding: (props) => (props.isDesktop ? '15px' : '0'),
  },
  termsList: {
    borderBottom: (props) => (props.isDesktop ? `1px solid ${colors.lightGray}` : 'none'),
    marginBottom: (props) => (props.isDesktop ? '25px' : '0'),
  },
  paymentAmount: {
    display: (props) => (props.isDesktop ? `flex` : 'block'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentTerm: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '15px',
    textAlign: 'center',
    color: colors.darkGray,
  },
  paymentTermTruckOSTerm: {
    fontWeight: 500,
    fontSize: '12px',
    color: colors.darkGray,
    textDecoration: 'underline',
    margin: '0px 3px',
    cursor: 'pointer',
  },
}));
