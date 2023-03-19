import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const usePaymentCustomerDetailsStyles = makeStyles(() => ({
  paymentCustomerDetails: {
    background: colors.white,
    border: '1px solid #E7E7E7',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '25px 20px',
    margin: '12px 0px 20px 0px',
  },
  paymentCustomerDetailsFieldHeader: {
    fontWeight: 450,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.lightGray3
  },
  paymentCustomerDetailsFieldContent: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.black,
    '&:not(:last-child)': {
      marginBottom: '12px',
    },
  },
  paymentCustomerDetailsField: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  paymentCustomerDetailsFieldLeft: {
    marginRight: '10px',
    width: '4rem',
  },
  paymentCustomerDetailsFieldNetWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentCustomerDetailsNetAmountTitle: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.black,
  },
  divider:{
    borderColor: 'rgba(15, 23, 42, 0.12)',
  }
}));
