import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import CardBg from 'modules/common/icons/card-bg.svg';
import WalletIcon from 'modules/common/icons/wallet.svg';
import WalletIconWeb from 'modules/common/icons/wallet-icon-web.svg';
import { FunctionComponent } from 'react';
import NumberFormat from 'react-number-format';
import { useReceivedPaymentStyles } from 'views/payment-dashboard/partials/received-payment/received-payment.styles';

interface ReceivedPaymentPartialPropsIntertface {
  receivedAmount: number;
  isDesktop: boolean;
}

export const ReceivedPaymentPartial: FunctionComponent<ReceivedPaymentPartialPropsIntertface> = ({
  receivedAmount,
  isDesktop,
}) => {
  const classes = useReceivedPaymentStyles();
  const { t } = useTranslation();

  return (
    <Grid item xs={6} md={12} lg={6}>
      <Box component={'div'} className={`${classes.paymentCard} ${classes.greenCard}`}>
        <Box component={'div'} className={`${classes.iconBox} ${classes.greenIcon}`}>
          {isDesktop ? <WalletIconWeb /> : <WalletIcon />}
          <CardBg className={classes.cardbg} />
        </Box>
        <Box component={'div'} className={classes.amountBox}>
          <Typography data-testid="received" component={'h5'} className={classes.amountHeading}>
            <NumberFormat
              value={receivedAmount}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
              suffix=" €"
              decimalScale={2}
            />
          </Typography>
          <Typography className={`${classes.paymentText} ${classes.receivedText}`}>
            {t('payment-dashboard.received.name')}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
