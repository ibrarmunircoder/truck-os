import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import CardBg from 'modules/common/icons/card-bg.svg';
import MoneyIcon from 'modules/common/icons/money-icon.svg';
import MoneyIconWeb from 'modules/common/icons/money-icon-web.svg';
import { FunctionComponent } from 'react';
import NumberFormat from 'react-number-format';
import { useOpenPaymentStyles } from 'views/payment-dashboard/partials/open-payment/open-payment.styles';

interface OpenPaymentPartialPropsInterface {
  openedAmount: number;
  isDesktop: boolean;
}

export const OpenPaymentPartial: FunctionComponent<OpenPaymentPartialPropsInterface> = ({
  openedAmount,
  isDesktop,
}) => {
  const classes = useOpenPaymentStyles();
  const { t } = useTranslation();

  return (
    <Grid item xs={6} md={12} lg={6}>
      <Box component={'div'} className={`${classes.paymentCard} ${classes.greyCard}`}>
        <Box component={'div'} className={`${classes.iconBox} ${classes.greyIcon}`}>
          {isDesktop ? <MoneyIconWeb /> : <MoneyIcon />}
          <CardBg className={classes.cardbg} />
        </Box>
        <Box component={'div'} className={classes.amountBox}>
          <Typography data-testid="opened" component={'h5'} className={classes.amountHeading}>
            <NumberFormat
              value={openedAmount}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
              suffix=" €"
              decimalScale={2}
            />
          </Typography>
          <Typography className={`${classes.paymentText} ${classes.pendingText}`}>
            {t('payment-dashboard.open.name')}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
