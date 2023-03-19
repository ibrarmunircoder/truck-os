import { makeStyles } from '@mui/styles';

export const usePaymentStatusDetailsStyles = makeStyles((theme) => ({
  paymentStatusDetails: {
    padding: '20px 28px',
    [theme.breakpoints.up('md')]: {
      maxWidth : '1040px',
      margin: '0 auto',
      marginBottom : '30px'
    },
  },
}));
