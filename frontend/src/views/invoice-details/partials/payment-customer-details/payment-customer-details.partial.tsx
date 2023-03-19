import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { Button } from 'modules/common/components/button';
import { useFetchReceivableSellingPrice } from 'modules/confirm-transaction/hooks';
import React, { FunctionComponent, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';
import { usePaymentCustomerDetailsStyles } from 'views/invoice-details/partials/payment-customer-details/payment-customer-details.styles';
interface PaymentCustomerDetailsPropsInterface {
  order: OrderResponseInterface;
}

export const PaymentCustomerDetails: FunctionComponent<PaymentCustomerDetailsPropsInterface> = ({
  order,
}): React.ReactElement => {
  const classes = usePaymentCustomerDetailsStyles();
  const [feesPercentage, setFeesPercentage] = useState(0);
  const { fetchInclusiveFees } = useFetchReceivableSellingPrice();

  useEffect(() => {
    const getInclusiveFees = async () => {
      if (order) {
        const invoiceDate = dayjs(new Date(order.invoiceDate)).format('YYYY-MM-DD');
        const dueDate = dayjs(new Date(order.invoiceDate)).add(Number(order.paymentTerm), 'day').format('YYYY-MM-DD');

        const { receivableSellingPrice } = await fetchInclusiveFees(
          order?.debtor?.debtorReferenceId,
          invoiceDate,
          dueDate,
        );

        setFeesPercentage(receivableSellingPrice?.instantBuyDiscountInPercent);
      }
    };
    void getInclusiveFees();
  }, [order]);

  return (
    <Box className={classes.paymentCustomerDetails}>
      <Box className={classes.paymentCustomerDetailsField}>
        <Box className={classes.paymentCustomerDetailsFieldLeft}>
          <Typography className={classes.paymentCustomerDetailsFieldHeader} component="h3">
            Customer
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order.debtor?.name}
          </Typography>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order.debtor?.streetAndNumber} {order.debtor?.addressAddon}
          </Typography>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order?.debtorRepresentative?.name}
          </Typography>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order?.debtorRepresentative?.email}
          </Typography>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order?.debtorRepresentative?.phone}
          </Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} sx={{ height: '0.2px', margin: '20px 0px' }} />
      <Box className={classes.paymentCustomerDetailsField} mb={2}>
        <Box className={classes.paymentCustomerDetailsFieldLeft}>
          <Typography className={classes.paymentCustomerDetailsFieldHeader} component="h3">
            Delivery date
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order.deliveryDate ? dayjs(new Date(order.deliveryDate)).format('DD.MM.YYYY') : 'NULL'}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.paymentCustomerDetailsField}>
        <Box className={classes.paymentCustomerDetailsFieldLeft}>
          <Typography className={classes.paymentCustomerDetailsFieldHeader} component="h3">
            Invoice date
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {order.invoiceDate ? dayjs(new Date(order.invoiceDate)).format('DD.MM.YYYY') : 'NULL'}
          </Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} sx={{ height: '0.2px', margin: '20px 0px' }} />
      <Box className={classes.paymentCustomerDetailsField} mb={2}>
        <Box className={classes.paymentCustomerDetailsFieldLeft}>
          <Typography className={classes.paymentCustomerDetailsFieldHeader} component="h3">
            Invoice amount
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            <NumberFormat
              value={order.invoiceAmount}
              displayType={'text'}
              thousandSeparator="." 
              decimalSeparator=","
              suffix=' €'
              decimalScale={2}
            />
          </Typography>
        </Box>
      </Box>
      <Box className={classes.paymentCustomerDetailsField}>
        <Box className={classes.paymentCustomerDetailsFieldLeft}>
          <Typography className={classes.paymentCustomerDetailsFieldHeader} component="h3">
            Fee
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.paymentCustomerDetailsFieldContent} component="h3">
            {`${feesPercentage} %`}
          </Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} sx={{ height: '0.2px', margin: '20px 0px 30px 0px' }} />
      <Box className={classes.paymentCustomerDetailsFieldNetWrapper}>
        <Typography className={classes.paymentCustomerDetailsNetAmountTitle} component="h3">
          Net Amount
        </Typography>
        <Button
          style={{
            borderRadius: '10px',
            width: '121px',
          }}
          type="submit"
          variant="contained"
        >
          <NumberFormat
            value={order.receivableAmount}
            displayType={'text'}
            thousandSeparator="." 
            decimalSeparator=","
            suffix=' €'
            decimalScale={2}
          />
        </Button>
      </Box>
    </Box>
  );
};
