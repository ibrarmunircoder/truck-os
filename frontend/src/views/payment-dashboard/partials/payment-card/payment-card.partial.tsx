import { Grid, GridProps } from '@mui/material';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { FunctionComponent } from 'react';
import { usePaymentCard } from 'views/payment-dashboard/hooks';
import { OpenPaymentPartial } from 'views/payment-dashboard/partials/open-payment/open-payment.partial';
import { usePaymentCardStyles } from 'views/payment-dashboard/partials/payment-card/payment-card.styles';
import { ReceivedPaymentPartial } from 'views/payment-dashboard/partials/received-payment/received-payment.partial';

export interface PaymentCardInterface extends GridProps {}

export const PaymentCardPartial: FunctionComponent<PaymentCardInterface> = () => {
  const isDesktop = useMatchMediaQuery();
  const classes = usePaymentCardStyles();
  const { received, opened } = usePaymentCard();

  return (
    <Grid container className={classes.paymentCards}>
      <ReceivedPaymentPartial isDesktop={isDesktop} receivedAmount={received} />
      <OpenPaymentPartial isDesktop={isDesktop} openedAmount={opened} />
    </Grid>
  );
};
