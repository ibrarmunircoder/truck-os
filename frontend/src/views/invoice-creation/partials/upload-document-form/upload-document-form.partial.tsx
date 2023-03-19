import { InfoOutlined } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DocumentUploader } from 'modules/common/components/document-uploader';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { useFetchReceivableSellingPrice } from 'modules/confirm-transaction/hooks';
import { FormAlert } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { removeUploadedInvoice } from 'modules/invoice-creation/invoice-creation.slice';
import { invoiceCreationSelector, virtualIbnSelector } from 'modules/invoice-creation/selectors';
import { setVirtualIbn } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { FunctionComponent, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import { OrderFileUploadTypeEnum } from 'views/invoice-creation/enum';
import { useOrderFileUpload, useUpdateOrder, useUploadDocumentFormSchema } from 'views/invoice-creation/hooks';
import { UploadDocumentFormValuesInterface } from 'views/invoice-creation/interfaces';
import { NotProceedModalPartial, UpdateInvoiceModalPartial } from 'views/invoice-creation/partials';
import { useUploadDocumentFormStyles } from 'views/invoice-creation/partials/upload-document-form/upload-document-form.styles';

export interface UploadDocumentFormPartialProps {
  onSubmit: (formValues: UploadDocumentFormValuesInterface) => void;
  setChangesDetected: (value: boolean) => void;
  isDesktop: boolean;
}

export const UploadDocumentFormPartial: FunctionComponent<UploadDocumentFormPartialProps> = (props) => {
  const { onSubmit, setChangesDetected, isDesktop } = props;
  const classes = useUploadDocumentFormStyles({ isDesktop });
  const { virtualIBN } = useSelector(virtualIbnSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { fetchInclusiveFees } = useFetchReceivableSellingPrice();
  const [updateInvoiceModal, setIsUpdateInvoiceModal] = useState(false);
  const [isVirtualMissingModal, setIsVirtualMissingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleUpdateOrder } = useUpdateOrder();
  const { paymentDetails, customerDetails } = useSelector(invoiceCreationSelector);
  const {
    handleFileSelected,
    isUploading,
    handleClose,
    documentDetails,
    virtualIban,
    virtualBic,
    companyName,
    resetStatusError,
    uploadStatus,
  } = useOrderFileUpload();

  const { handleSubmit, handleBlur, isValid, errors } = useEnhancedFormik({
    initialValues: documentDetails,
    onSubmit,
    validationSchema: useUploadDocumentFormSchema(),
    enableReinitialize: true,
    validateOnMount: true,
  });

  const amountCalculation = (totalAmount: number, percentage: number) => {
    const calculateAmount = (totalAmount * percentage) / 100;
    const receivingAmount = totalAmount - calculateAmount;
    return receivingAmount;
  };

  useEffect(() => {
    const getInclusiveFees = async () => {
      if (paymentDetails && customerDetails) {
        const invoiceDate = dayjs(new Date(paymentDetails.invoiceDate)).format('YYYY-MM-DD');
        const dueDate = dayjs(new Date(paymentDetails.invoiceDate))
          .add(Number(paymentDetails.paymentTerm), 'day')
          .format('YYYY-MM-DD');

        const { receivableSellingPrice } = await fetchInclusiveFees(
          customerDetails?.debtorReferenceId,
          invoiceDate,
          dueDate,
        );

        const receivedAmount = amountCalculation(
          parseFloat(paymentDetails?.invoiceAmount),
          receivableSellingPrice?.instantBuyDiscountInPercent,
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, __typename, orderFiles, ...orderFormData } = paymentDetails;
        const orderUpdateData = {
          ...orderFormData,
          deliveryDate: new Date(paymentDetails.deliveryDate).toUTCString(),
          invoiceDate: new Date(paymentDetails.invoiceDate).toUTCString(),
          invoiceAmount: parseFloat(paymentDetails?.invoiceAmount),
          debtorId: customerDetails?.id,
          receivableAmount: receivedAmount,
        };
        await handleUpdateOrder(id, orderUpdateData);
      }
    };
    void getInclusiveFees();
  }, [paymentDetails, customerDetails]);

  useEffect(() => {
    if (documentDetails?.invoice !== null || documentDetails?.pod !== null) {
      setChangesDetected(true);
    } else {
      setChangesDetected(false);
    }
  }, [documentDetails]);

  const handleFileUpload = () => {
    dispatch(setVirtualIbn(true));
    setChangesDetected(false);
  };

  useEffect(() => {
    if (virtualIBN) {
      setLoading(false);
    }
  }, [virtualIBN]);

  const handleVirtualClick = () => {
    setLoading(true);
    void router.push({
      pathname: `/${routes.confirmTransaction}/${paymentDetails?.id}`,
    });
  };

  const handleCancelUpdateInvoice = () => {
    setIsUpdateInvoiceModal(false);
    setIsVirtualMissingModal(true);
  };

  const handleConfirmUpdateInvoice = () => {
    dispatch(removeUploadedInvoice());
    dispatch(setVirtualIbn(false));
    setIsUpdateInvoiceModal(false);
  };

  return (
    <>
      {!virtualIBN ? (
        <form onSubmit={handleSubmit}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, left: isDesktop ? '260px' : 0 }}
            open={isUploading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {uploadStatus?.type === 'success' ? (
            <FormAlert
              open={uploadStatus?.type === 'success'}
              message={uploadStatus?.message}
              severity={'success'}
              autoHideDuration={3000}
              onClose={resetStatusError}
            />
          ) : (
            <FormAlert
              open={uploadStatus?.type === 'error'}
              message={uploadStatus?.message}
              severity={'error'}
              autoHideDuration={3000}
              onClose={resetStatusError}
            />
          )}
          <Grid container mt={2}>
            <Grid item xs={12}>
              <Box className={classes.stepContent} style={{ padding: 0 }}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} lg={6}>
                    <DocumentUploader
                      title={t('invoice-creation.invoice-document-title')}
                      subtitle={
                        !!documentDetails.invoice
                          ? t('invoice-creation.invoice-document-subtitle-success')
                          : t('invoice-creation.invoice-document-subtitle')
                      }
                      isUploaded={!!documentDetails.invoice}
                      field="invoice"
                      accept=".pdf"
                      onBlur={handleBlur}
                      onChange={handleFileSelected(OrderFileUploadTypeEnum.ORDER_FILE_INVOICE_CATEGORY)}
                    >
                      <section className={classes.documentNoteSection}>
                        <Box className={classes.virtualDataBox}>
                          <Box className={classes.documentNoteSectionInfoIcon}>
                            <Tooltip
                              classes={{
                                tooltip: classes.tooltip,
                              }}
                              enterTouchDelay={0}
                              placement="bottom-start"
                              title={t('invoice-creation.upload-document-tooltip-text1')}
                            >
                              <InfoOutlined className={classes.infoIcon} />
                            </Tooltip>
                          </Box>
                          <Box>
                            <Typography className={classes.virtualHeader} component="h3">
                              {t('invoice-creation.upload-document.iban-title')}
                            </Typography>
                            <Typography className={classes.virtualText}>
                              {t('invoice-creation.upload-document.iban-description')}
                            </Typography>
                            <Box mt={1}>
                              <Box className={classes.virtualListBox}>
                                <Typography className={classes.virtualSubheading} component="h3">
                                  {t('invoice-creation.upload-document.recipient-name')}
                                </Typography>
                                <Typography
                                  flex={1}
                                  className={classes.virtualSubtext}
                                  component="h3"
                                >{`${companyName} via Walbing`}</Typography>
                              </Box>
                              <Box className={classes.virtualListBox}>
                                <Typography className={classes.virtualSubheading} component="h3">
                                  {t('invoice-creation.upload-document.virtualiban')}
                                </Typography>
                                <Typography flex={1} className={classes.virtualSubtext} component="h3">
                                  <NumberFormat
                                    format="#### #### #### #### #### ##"
                                    isNumericString={true}
                                    displayType="text"
                                    value={virtualIban}
                                  />
                                </Typography>
                              </Box>
                              <Box className={classes.virtualListBox}>
                                <Typography className={classes.virtualSubheading} component="h3">
                                  {t('invoice-creation.upload-document.virtualbic')}
                                </Typography>
                                <Typography flex={1} className={classes.virtualSubtext} component="h3">
                                  {virtualBic}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </section>
                    </DocumentUploader>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <DocumentUploader
                      style={{ marginBottom: '10px' }}
                      title={t('invoice-creation.pod-document-title')}
                      subtitle={
                        !!documentDetails.pod
                          ? t('invoice-creation.pod-document-subtitle-success')
                          : t('invoice-creation.pod-document-subtitle')
                      }
                      isUploaded={!!documentDetails.pod}
                      field="pod"
                      accept="application/pdf"
                      onBlur={handleBlur}
                      onChange={handleFileSelected(OrderFileUploadTypeEnum.ORDER_FILE_POD_CATEGORY)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} mt={3} mb={3} display="flex" justifyContent={'center'}>
              <Button
                disabled={!isValid || Object.keys(errors).length > 0}
                onClick={handleFileUpload}
                fullWidth
                type="submit"
                variant="contained"
                className={classes.stepButton}
              >
                {documentDetails.invoice === null && documentDetails.pod === null
                  ? t('invoice-creation.order-btn-text2')
                  : documentDetails.invoice === null && documentDetails.pod !== null
                  ? t('invoice-creation.order-btn-text2')
                  : documentDetails.invoice !== null && documentDetails.pod === null
                  ? t('invoice-creation.order-btn-text3')
                  : t('next')}
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.stepContent} style={{ padding: 0 }}>
              <Grid container columnSpacing={3}>
                <Grid item xs={12} lg={6}>
                  <Box className={classes.cardBox}>
                    <Typography className={classes.cardTitle}>{t('invoice-creation.notice-reminder-title')}</Typography>
                    <Typography className={classes.cardText}>{t('virtual-iban.question')}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box className={classes.virtualDataBox} mb={3}>
                    <Box className={classes.documentNoteSectionInfoIcon}>
                      <Tooltip
                        classes={{
                          tooltip: classes.tooltip,
                        }}
                        enterTouchDelay={0}
                        placement="bottom-start"
                        title={t('invoice-creation.upload-document-tooltip-text1')}
                      >
                        <InfoOutlined className={classes.infoIcon} />
                      </Tooltip>
                    </Box>
                    <Box>
                      <Typography className={classes.virtualHeader} component="h3">
                        {t('invoice-creation.upload-document.iban-title')}
                      </Typography>
                      <Typography className={classes.virtualText}>
                        {t('invoice-creation.upload-document.iban-description')}
                      </Typography>
                      <Box mt={1}>
                        <Box className={classes.virtualListBox}>
                          <Typography className={classes.virtualSubheading} component="h3">
                            {t('invoice-creation.upload-document.recipient-name')}
                          </Typography>
                          <Typography
                            flex={1}
                            className={classes.virtualSubtext}
                            component="h3"
                          >{`${companyName} via Walbing`}</Typography>
                        </Box>
                        <Box className={classes.virtualListBox}>
                          <Typography className={classes.virtualSubheading} component="h3">
                            {t('invoice-creation.upload-document.virtualiban')}
                          </Typography>
                          <Typography flex={1} className={classes.virtualSubtext} component="h3">
                            <NumberFormat
                              format="#### #### #### #### #### ##"
                              isNumericString={true}
                              displayType="text"
                              value={virtualIban}
                            />
                          </Typography>
                        </Box>
                        <Box className={classes.virtualListBox}>
                          <Typography className={classes.virtualSubheading} component="h3">
                            {t('invoice-creation.upload-document.virtualbic')}
                          </Typography>
                          <Typography flex={1} className={classes.virtualSubtext} component="h3">
                            {virtualBic}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                                <Box className={classes.cardBox}>
                                    <Typography className={classes.cardTitle}>Verification process</Typography>
                                    <Typography className={classes.cardText}>To get instant payment, you will have to get verified through our KYC process. </Typography>
                                    <Typography className={classes.cardText}>Verification will only take a few minutes.</Typography>
                                </Box>
                            </Grid> */}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleVirtualClick}
              variant="contained"
              className={classes.stepButton}
              disabled={loading}
            >
              {loading ? t('please-wait') : t('yes')}
            </Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              fullWidth
              onClick={() => setIsUpdateInvoiceModal(true)}
              variant="contained"
              className={classes.backButton}
            >
              {t('no-text')}
            </Button>
          </Grid>
        </Grid>
      )}
      {updateInvoiceModal ? (
        <UpdateInvoiceModalPartial
          handleConfirm={handleConfirmUpdateInvoice}
          handleCancel={handleCancelUpdateInvoice}
        />
      ) : (
        ''
      )}
      {isVirtualMissingModal ? <NotProceedModalPartial handleConfirm={() => router.push({ pathname: `/` })} /> : ''}
    </>
  );
};
