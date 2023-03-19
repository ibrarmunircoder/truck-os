import { Add, SearchRounded } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Button } from 'modules/common/components/button';
import { useRouter, useTranslation } from 'modules/common/hooks';
import PaymentRequestIcon from 'modules/common/icons/request-payment-icon.svg';
import React, { FunctionComponent } from 'react';
import routes from 'routes';
import { useAccountVerified, useFetchOrder } from 'views/payment-dashboard/hooks';
import { EmptyRecord, KycModalPartial, RecordListing, StatusAlert } from 'views/payment-dashboard/partials';
import { PaymentCardPartial } from 'views/payment-dashboard/partials/payment-card/payment-card.partial';
import { usePaymentViewStyles } from 'views/payment-dashboard/partials/payment-view/payment-view.styles';

export const PaymentViewPartial: FunctionComponent = () => {
  const classes = usePaymentViewStyles();
  const {
    orders: ordersData,
    isDebtorDenied,
    handleDebtorAlertClose,
    handleSearchTerm,
    handleLoadMoreRecords,
    error,
  } = useFetchOrder();
  const { handlePaymentFlowClick, isShowKycModal, setIsShowKycModal } = useAccountVerified();
  const { t } = useTranslation();
  const router = useRouter();

  const orders = ordersData && ordersData.data?.length ? ordersData.data : null;
  const ordersElement = orders ? <RecordListing orders={orders} /> : <EmptyRecord />;
  const loadMoreButtonElement =
    !error && ordersData && ordersData.data.length && ordersData.data.length !== ordersData.totalCount ? (
      <Button
        style={{
          marginTop: '7px',
          fontSize: '12px',
          borderRadius: '8px',
        }}
        disabled={ordersData.data.length === ordersData.totalCount}
        fullWidth
        type="button"
        variant="contained"
        text={t('load-more-btn-text')}
        onClick={handleLoadMoreRecords}
      />
    ) : null;

  const statusAlertElement = isDebtorDenied ? (
    <StatusAlert variant="filled" onClose={handleDebtorAlertClose}>
      <Box>
        <Typography className={classes.statusAlertText} component="span">
          {t('payment-dashboard.status-alert')}
        </Typography>
        <Typography className={classes.statusAlertText} ml="4px" component="a" href="tel:+4922198819386">
          {t('payment-dashboard.status-alert-contact')}
        </Typography>
      </Box>
    </StatusAlert>
  ) : null;

  const handleKycProcees = () => {
    void router.push({ route: routes.companyRegister });
  };

  return (
    <>
      {statusAlertElement}
      <Grid container className={classes.pageLayout}>
        <PaymentCardPartial />
        <Grid container>
          <Grid item xs={12}>
            <Typography component={'h5'} className={classes.sectionHeading}>
              {t('payments')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component={'div'} className={classes.searchInput}>
              <TextField
                fullWidth
                id="customer-name"
                label={t('payment-dashboard.search-label')}
                variant="outlined"
                className={classes.formControl}
                onChange={handleSearchTerm()}
                InputProps={{
                  endAdornment: (
                    <IconButton className={classes.searchButton}>
                      <SearchRounded />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box component={'div'} marginBottom={2}>
              <Box className={classes.requestLink} onClick={handlePaymentFlowClick}>
                <Box className={classes.paymentIcon}>
                  <PaymentRequestIcon />
                </Box>
                <Typography className={classes.requestText}>{t('payment-dashboard.payment-btn-text')}</Typography>
                <Add className={classes.addRequestIcon} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {ordersElement}
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          {loadMoreButtonElement}
        </Grid>
      </Grid>

      {isShowKycModal && (
        <KycModalPartial handleConfirm={handleKycProcees} handleCancel={() => setIsShowKycModal(false)} />
      )}
    </>
  );
};
