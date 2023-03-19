import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTermsCondition, useTranslation } from 'modules/common/hooks';
import { classes as classesJoin } from 'modules/common/utils/classes';
import React, { FunctionComponent } from 'react';
import { useAccountCompanyDetails } from 'views/account-settings/hooks';
import { useAccountTermsConditionsStyles } from 'views/account-settings/partials/account-terms-conditions/account-terms-conditions.styles';

interface AccountCompanyDetailsPropsInterface {
  isDesktop?: boolean;
}

export const AccountTermsConditions: FunctionComponent<AccountCompanyDetailsPropsInterface> = ({
  isDesktop,
}): React.ReactElement => {
  const classes = useAccountTermsConditionsStyles({ isDesktop });
  const { accountRecord: account, handleBackButtonClick } = useAccountCompanyDetails();
  const { t } = useTranslation();
  const { handlePaymentProviderTermsConditionsClick, handleTruckOSTermsClick } = useTermsCondition();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" className={classes.accountTermsConditionsPageTitle}>
            <div className={classes.accountTermsConditionsBackIcon} onClick={handleBackButtonClick}>
              <ChevronLeftIcon />
            </div>
            <span>{t('terms-conditions')}</span>
          </Typography>
          {!isDesktop && (
            <Typography component="h2" className={classes.accountTermsConditionsPageSubtitle}>
              {account && account.companyName}
            </Typography>
          )}
          {!isDesktop && <Typography component="h2" className={classes.accountTermsConditionsPageSubtitle2}>
            {t('account-settings.terms-condition-message')}
          </Typography>}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.accountTermsConditionAccordian} onClick={handleTruckOSTermsClick}>
            <Typography className={classes.accountTermsConditionAccordianTitle} component="h4">
              TruckOS {t('terms-conditions')}
            </Typography>
            <div className={classes.accountTermsConditionAccordianIcon}>
              <ArrowForwardIosIcon />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            className={classesJoin(classes.accountTermsConditionAccordian, classes.accountTermsConditionAccordianLast)}
            onClick={handlePaymentProviderTermsConditionsClick}
          >
            <Typography className={classes.accountTermsConditionAccordianTitle} component="h4">
              Walbing {t('terms-conditions')}
            </Typography>
            <div className={classes.accountTermsConditionAccordianIcon}>
              <ArrowForwardIosIcon />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
