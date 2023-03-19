/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Paper } from "@mui/material";
import dayjs from 'dayjs';
import { accountIdSelector } from "modules/account-id/selectors";
import { AutoCompleteField, InputField } from "modules/common/components";
import { useEuCountries, useTranslation } from 'modules/common/hooks';
import { DateField } from "modules/forms/components/date-field";
import { useEnhancedFormik } from "modules/forms/hooks";
import { invoiceCreationSelector, stepsVerifiedSelector } from "modules/invoice-creation/selectors";
import { orderSelector } from "modules/orders/selectors";
import { FunctionComponent, useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { usePaymentFormSchema } from 'views/invoice-creation/hooks';
import { PaymentFormValuesInterface } from 'views/invoice-creation/interfaces';
import { usePaymentFormStyles } from 'views/invoice-creation/partials/payment-form/payment-form.styles';

export interface PaymentFormPartialProps {
  onSubmit: (formValues: PaymentFormValuesInterface) => void;
  onValueChange: (formValues: PaymentFormValuesInterface) => void;
  setChangesDetected: (value: boolean) => void;
  isDesktop: boolean;
}

export const PaymentFormPartial: FunctionComponent<PaymentFormPartialProps> = (props) => {
    const { paymentDetails, customerDetails } = useSelector(invoiceCreationSelector);
    const orders = useSelector(orderSelector);
    const { isSecondStepVerified } = useSelector(stepsVerifiedSelector);
    const euCountries = useEuCountries();
    const { accountId } = useSelector(accountIdSelector);
    const initialValues: PaymentFormValuesInterface = {
        invoiceNumber: '',
        deliveryDate: new Date().toUTCString(),
        invoiceDate: null,
        applicableLaw: '',
        paymentTerm: '',
        invoiceAmount: '',
    };
    const { onSubmit, onValueChange, setChangesDetected, isDesktop } = props;
    const classes = usePaymentFormStyles({ isDesktop });
    const [isValidationError, setIsValidationError] = useState(true);
    const [isInvoiceNumberExist, setIsInvoiceNumberExist] = useState(false);
    const [isInvalidDateTerms, setIsInvalidDateTerms] = useState(false);
    const [isCountryValidate, setIsCountryValidate] = useState(false);
    const [validDays, setValidDays] = useState(null);
    const { t } = useTranslation();

  const {
    handleSubmit,
    handleChange,
    values,
    visibleErrors,
    setFieldValue,
    handleBlur,
    handleReset,
    errors,
    setFieldTouched
  } = useEnhancedFormik({
    initialValues,
    onSubmit,
    validationSchema: usePaymentFormSchema(),
  });

  useEffect(() => {
    setTimeout(() => {
      const value = ['invoiceNumber', 'deliveryDate', 'applicableLaw', 'paymentTerm', 'invoiceAmount'];
      value?.forEach(
        (val) =>
          void setFieldValue(val, paymentDetails?.[val] || (val !== 'deliveryDate' ? '' : new Date().toUTCString())),
      );

      void setFieldValue('invoiceDate', paymentDetails?.invoiceDate || null);
    }, 200);
    if (!isSecondStepVerified) {
      setChangesDetected(true);
    } else {
      setChangesDetected(false);
    }
  }, [paymentDetails]);

  useEffect(() => {
    if (errors && Object.keys(errors).length === 0) {
      setIsValidationError(false);
    } else {
      setIsValidationError(true);
    }
    onValueChange(values);
  }, [errors]);

    useEffect(() => {
        if(values.invoiceNumber){
            const orderExist = orders.data.find((order) => order.invoiceNumber === values.invoiceNumber && order.accountId === accountId);
            if (orderExist && !isSecondStepVerified && paymentDetails?.invoiceNumber !== values?.invoiceNumber) {
                setIsInvoiceNumberExist(true);
            } else {
                setIsInvoiceNumberExist(false);
            }
        }
        if(values.invoiceDate && values.paymentTerm){
            if(parseInt(values.paymentTerm, 10) > 11){
                const dueDate = dayjs(new Date(values.invoiceDate)).add(Number(values.paymentTerm), 'day').format('YYYY-MM-DD');
                const differenceInDays = dayjs(dueDate).diff(dayjs().startOf('day'), 'days');
                setValidDays(differenceInDays);
                if(differenceInDays < 11){
                    setIsInvalidDateTerms(true);
                }else{
                    setIsInvalidDateTerms(false);
                }
            }
            else{
                setIsInvalidDateTerms(false);
            }
        }
        if(values.applicableLaw !== undefined){
            if(values.applicableLaw !== customerDetails?.country){
                setIsCountryValidate(true);
            }else{
                setIsCountryValidate(false);
            }
        }else{
            setIsCountryValidate(false);
        }
    }, [values])

  const CustomPaper = (paperProps) => <Paper elevation={4} {...paperProps} />;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className={classes.stepContent}>
                        <Grid container columnSpacing={3}>
                            <Grid item xs={12} lg={6}>
                                <InputField
                                    name="invoiceNumber"
                                    type="text"
                                    label={t('invoice-creation.invoice-number')}
                                    value={values.invoiceNumber}
                                    helperText={isInvoiceNumberExist ? t('invoice-creation.invoice-number-exist') : visibleErrors.invoiceNumber}
                                    error={isInvoiceNumberExist ? true : Boolean(visibleErrors.invoiceNumber)}
                                    fullWidth
                                    onChange={handleChange}
                                    onReset={() => setFieldValue('invoiceNumber', '')}
                                    onBlur={handleBlur}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <DateField
                                    value={values.deliveryDate || new Date()}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(date) => setFieldValue('deliveryDate', date ? new Date(date).toUTCString() : '')}
                                    onOpen={()=> void setFieldTouched('deliveryDate', true)}
                                    textFieldProps={{
                                        variant: 'outlined',
                                        name: 'deliveryDate',
                                        label: t('invoice-creation.delivery-date'),
                                        helperText: visibleErrors.deliveryDate,
                                        error: Boolean(visibleErrors.deliveryDate),
                                        fullWidth: true,
                                        onReset: handleReset,
                                        onBlur: handleBlur
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <DateField
                                    value={values.invoiceDate}
                                    inputFormat='dd/MM/yyyy'
                                    onChange={(date) => setFieldValue('invoiceDate', date ? new Date(date).toUTCString() : '')}
                                    onOpen={()=> void setFieldTouched('invoiceDate', true)}
                                    textFieldProps={{
                                        variant: 'outlined',
                                        name: 'invoiceDate',
                                        label: t('invoice-creation.invoice-date'),
                                        helperText: visibleErrors.invoiceDate,
                                        error: Boolean(visibleErrors.invoiceDate),
                                        fullWidth: true,
                                        onReset: handleReset,
                                        onBlur: handleBlur
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <AutoCompleteField
                                    defaultValue={euCountries.find((countryObj) => countryObj.code === values.applicableLaw) || values.applicableLaw}
                                    value={euCountries.find((countryObj) => countryObj.code === values.applicableLaw) || values.applicableLaw}
                                    options={euCountries}
                                    onChange={(_, value: any) => {
                                        void setFieldValue('applicableLaw', value?.code);
                                    }}
                                    PaperComponent={CustomPaper}
                                    renderOption={(optionProps, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                alt="Country Flag"
                                            />
                                            {option.label}
                                        </Box>
                                    )}
                                    textFieldProps={{
                                        id: 'applicableLaw',
                                        label: t('invoice-creation.applicable-law'),
                                        name: 'applicableLaw',
                                        variant: 'outlined',
                                        helperText: isCountryValidate ? t('invoice-creation.applicablelaw.validation-msg1') : visibleErrors.applicableLaw,
                                        error: isCountryValidate ? true : Boolean(visibleErrors.applicableLaw),
                                        fullWidth: true,
                                        onBlur: handleBlur,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <NumberFormat
                                    customInput={InputField}
                                    name="paymentTerm"
                                    thousandSeparator={true}
                                    suffix={t('invoice-creation.payment-term.input-suffix')}
                                    label={t('invoice-creation.payment-term.label')}
                                    placeholder={t('invoice-creation.payment-term.placeholder')}
                                    value={values.paymentTerm}
                                    helperText={isInvalidDateTerms ? `${t('invoice-creation.payment-term.validation-text1')} ${ validDays <= 0 ? t('invoice-creation.payment-term.validation-text2') : `${t('invoice-creation.payment-term.validation-text3')} ${validDays} ${t('invoice-creation.payment-term.validation-text4')}`}` : visibleErrors.paymentTerm }
                                    error={isInvalidDateTerms ? true : Boolean(visibleErrors.paymentTerm)}
                                    fullWidth
                                    onValueChange={(targetValue) => {
                                        void setFieldValue('paymentTerm', targetValue?.value);
                                    }}
                                    onReset={() => setFieldValue('paymentTerm', '')}
                                    onBlur={handleBlur}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <NumberFormat
                                    customInput={InputField}
                                    name="invoiceAmount"
                                    thousandSeparator="." 
                                    decimalSeparator=","
                                    suffix=' €'
                                    label={t('invoice-creation.invoice-amount')}
                                    value={values.invoiceAmount}
                                    helperText={visibleErrors.invoiceAmount}
                                    error={Boolean(visibleErrors.invoiceAmount)}
                                    fullWidth
                                    onValueChange={(value) => {
                                        void setFieldValue('invoiceAmount', value?.floatValue);
                                    }}
                                    onReset={() => setFieldValue('invoiceAmount', '')}
                                    onBlur={handleBlur}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth type="submit" variant='contained' disabled={isValidationError || isInvalidDateTerms || isCountryValidate || isInvoiceNumberExist} className={classes.stepButton}>{t('next')}</Button>
                </Grid>
            </Grid>
    </form>
  );
};
