import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, List, ListItem, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTermsCondition, useTranslation } from 'modules/common/hooks';
import CircleImage from 'modules/common/icons/circle-img.svg';
import { useFetchReceivableSellingPrice } from 'modules/confirm-transaction/hooks';
import { FormAlert } from 'modules/forms/components';
import { invoiceCreationSelector, newDebtorEntrySelector } from 'modules/invoice-creation/selectors';
import React, { FunctionComponent, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { useCreateInvoice } from 'views/confirm-transaction/hooks';
import { usePaymentTermStyles } from 'views/confirm-transaction/partials/payment-term/payment-term.styles';
import { PaymentFormValuesInterface } from 'views/invoice-creation/interfaces';

export interface PaymentTermPartialProps {
  paymentDetails: PaymentFormValuesInterface;
  isDesktop?: boolean;
}
export const PaymentTermPartial: FunctionComponent<PaymentTermPartialProps> = (props) => {
  const { paymentDetails, isDesktop } = props;
  const classes = usePaymentTermStyles({ isDesktop });
  const { isNewDebtorEntry } = useSelector(newDebtorEntrySelector);
  const { fetchInclusiveFees } = useFetchReceivableSellingPrice();
  const { customerDetails } = useSelector(invoiceCreationSelector);
  const { handleCreateInvoice, error, resetError, loading, setErrorMessage } = useCreateInvoice();
  const { handleTruckOSTermsClick, handlePaymentProviderTermsConditionsClick } = useTermsCondition();

  const addDaysCurrentDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const amountCalculation = (totalAmount: number, percentage: number) => {
    const calculateAmount = (totalAmount * percentage) / 100;
    const receivingAmount = totalAmount - calculateAmount;
    return receivingAmount;
  };

  const [recieveDate, setReceiveDate] = useState(undefined);
  const [receivableAmount, setReceivableAmount] = useState(0);
  const [feesPercentage, setFeesPercentage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const newReceivedDate = addDaysCurrentDate(new Date(), 3);
    setReceiveDate(new Date(newReceivedDate).toLocaleDateString('tr-TR'));
  }, []);

  useEffect(() => {
    const getInclusiveFees = async () => {
      if (paymentDetails && customerDetails) {
        const invoiceDate = dayjs(new Date(paymentDetails.invoiceDate)).format('YYYY-MM-DD');
        const dueDate = dayjs(new Date(paymentDetails.invoiceDate))
          .add(Number(paymentDetails.paymentTerm), 'day')
          .format('YYYY-MM-DD');
        try {
          const { receivableSellingPrice } = await fetchInclusiveFees(
            customerDetails?.debtorReferenceId,
            invoiceDate,
            dueDate,
          );

          const receivedAmount = amountCalculation(
            parseFloat(paymentDetails?.invoiceAmount),
            receivableSellingPrice?.instantBuyDiscountInPercent,
          );
          setFeesPercentage(receivableSellingPrice?.instantBuyDiscountInPercent);
          setReceivableAmount(receivedAmount);
        } catch (errorData) {
          console.error(errorData);
          setErrorMessage(errorData);
        }
      }
    };
    void getInclusiveFees();
  }, [receivableAmount, paymentDetails, customerDetails]);

  return (
    <Box component={'div'}>
      {error && <FormAlert error={error} autoHideDuration={3000} onClose={resetError} />}
      {!isDesktop ? (
        <Typography component="h6" className={classes.confirmTitle}>
          {t('confirm-transaction.payment-term-title')}
        </Typography>
      ) : null}
      <Box className={classes.paymentBox}>
        <Box className={classes.termsList}>
          <List>
            <ListItem className={classes.listItem}>
              <Typography className={classes.paymentText}>{t('confirm-transaction.payment-term-title')}</Typography>
              <Box className={classes.dataItem}>{`${paymentDetails?.paymentTerm || 0} days`}</Box>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography className={classes.paymentText}>
                {t('confirm-transaction.payment-term-received-date-heading')}
              </Typography>
              <Box className={classes.dataItem}>{recieveDate}</Box>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography className={classes.paymentText}>
                <span>{t('confirm-transaction.payment-term-fee-heading')}</span>
                <Tooltip
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  enterTouchDelay={0}
                  title={
                    isNewDebtorEntry
                      ? t('confirm-transaction.tooltip1-description')
                      : t('confirm-transaction.tooltip2-description')
                  }
                >
                  <InfoOutlined className={classes.infoIcon} />
                </Tooltip>
              </Typography>
              <Box className={classes.dataItem}>{`${feesPercentage} %`}</Box>
            </ListItem>
          </List>
        </Box>
        <Box className={classes.paymentAmount}>
          <Typography component="h6" className={classes.receiveTitle}>
            {t('confirm-transaction.payment-term-received-heading')}
          </Typography>
          <Box className={classes.amountView}>
            <CircleImage className={classes.leftCircle} />
            <Typography className={classes.amountText}>
              <NumberFormat
                displayType="text"
                value={receivableAmount}
                thousandSeparator="." 
                decimalSeparator=","
                suffix=' €'
              />
            </Typography>
            <CircleImage className={classes.rightCircle} />
          </Box>
        </Box>
      </Box>
      <Box marginTop={8}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleCreateInvoice(paymentDetails.id, receivableAmount)}
          className={classes.stepButton}
          disabled={loading}
        >
          {loading ? t('please-wait') : t('confirm-transaction.payment-term-btn-text')}
        </Button>
      </Box>
      <Box mt={1}>
        <Typography component="p" className={classes.paymentTerm}>
          When clicking on ‘Get payment’ you accept the
          <Typography component="span" onClick={handleTruckOSTermsClick} className={classes.paymentTermTruckOSTerm}>
            truckOS
          </Typography>
          and
          <Typography
            component="span"
            onClick={handlePaymentProviderTermsConditionsClick}
            className={classes.paymentTermTruckOSTerm}
          >
            Walbing
          </Typography>
          terms and conditions.
        </Typography>
      </Box>
    </Box>
  );
};
