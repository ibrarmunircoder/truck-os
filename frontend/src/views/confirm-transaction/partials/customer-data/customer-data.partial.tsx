import { Box, Typography } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import React, { FunctionComponent } from 'react';
import { useCustomerDataStyles } from 'views/confirm-transaction/partials/customer-data/customer-data.styles';
import { CustomerFormValuesInterface } from 'views/invoice-creation/interfaces';

export interface CustomerDataPartialProps {
  customerDetails: CustomerFormValuesInterface;
}

export const CustomerDataPartial: FunctionComponent<CustomerDataPartialProps> = (props) => {
  const classes = useCustomerDataStyles();
  const { customerDetails } = props;
  const { t } = useTranslation();

  return (
    <Box component={'div'}>
      <Typography component="h6" className={classes.confirmTitle}>
        {t('confirm-transaction.customer-data-question')}
      </Typography>
      {customerDetails && (
        <Box className={classes.customerview}>
          <Box className={classes.companyDetails}>
            <Typography component="h6" className={classes.companyTitle}>
              {customerDetails?.name}
            </Typography>
            <Typography component="p" className={classes.companyText}>
              {customerDetails?.streetAndNumber} {customerDetails?.city} {customerDetails?.postalCode}{' '}
              {customerDetails?.country}
            </Typography>
            <Typography component="p" className={classes.companyText}>
              {customerDetails?.commercialRegisterNumber}
            </Typography>
            <Typography component="p" className={classes.companyText}>
              {customerDetails?.representative?.email}
            </Typography>
            <Typography component="p" className={classes.companyText}>
              {customerDetails?.representative?.phone}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
