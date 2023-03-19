import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { FunctionComponent } from 'react';
import { usePaymentStatusDetails } from 'views/invoice-details/hooks';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';
import { InvoiceDocuments, PaymentCustomerDetails, PaymentStatusCard } from 'views/invoice-details/partials';
import { usePaymentStatusDetailsStyles } from 'views/invoice-details/partials/payment-status-details/payment-status-details.styles';

interface PaymentCustomerDetailsPropsInterface {
  order: OrderResponseInterface;
}

export const PaymentStatusDetails: FunctionComponent<PaymentCustomerDetailsPropsInterface> = ({
  order,
}): React.ReactElement => {
  const {
    statusTuple: [status, statusDescription],
    isMoneyPendingIcon,
    handleTooltipClose,
    handleTooltipOpen,
    openToolTip,
  } = usePaymentStatusDetails(order.status ?? null, order.debtor?.status ?? null);
  const classes = usePaymentStatusDetailsStyles();
  return (
    <Box className={classes.paymentStatusDetails}>
      <Grid container>
        <Grid item xs={12}>
          <PaymentStatusCard
            status={status}
            isMoneyPendingIcon={isMoneyPendingIcon}
            statusDescription={statusDescription}
            handleTooltipClose={handleTooltipClose}
            handleTooltipOpen={handleTooltipOpen}
            open={openToolTip}
          />
        </Grid>
        <Grid item xs={12}>
          <PaymentCustomerDetails order={order} />
        </Grid>
        <Grid item xs={12}>
          <InvoiceDocuments order={order} />
        </Grid>
      </Grid>
    </Box>
  );
};
