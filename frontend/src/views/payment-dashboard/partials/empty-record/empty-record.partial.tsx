import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import PaymentWallet from 'modules/common/icons/payment.svg';
import React from 'react';
import { useEmptyRecordStyles } from 'views/payment-dashboard/partials/empty-record/empty-record.styles';

export const EmptyRecord = (): React.ReactElement => {
  const classes = useEmptyRecordStyles();
  const { t } = useTranslation();
  return (
    <Grid py={14} container flexWrap="nowrap" flexDirection="column" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <PaymentWallet />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" className={classes.emptyRecordTitle} component="h2">
          {t('payment-dashboard.empty-record.title')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" className={classes.emptyRecordSubtitle} component="h2">
          {t('payment-dashboard.empty-record.sub-title')}
        </Typography>
      </Grid>
    </Grid>
  );
};
