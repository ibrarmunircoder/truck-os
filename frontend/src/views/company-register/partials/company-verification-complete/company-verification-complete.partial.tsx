import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { useTranslation } from 'modules/common/hooks';
import React from 'react';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { useCompanyVerificationCompleteStyles } from 'views/company-register/partials/company-verification-complete/company-verification-complete.styles';

export const CompanyVerificationComplete = (): React.ReactElement => {
  const classes = useCompanyVerificationCompleteStyles();
  const { t } = useTranslation();
  const isDesktop = useMatchMediaQuery();
  return (
    <Box className={classes.companyVerificationCompleteContainer}>
      <Grid container>
        <Grid item xs={12}>
          <CompanyHeader title={t('company-register.step8.title')} />
        </Grid>
      </Grid>
      <section className={classes.companyVerificationCompleteSection}>
        <div className={classes.companyVerificationCompleteImage}>
          <img src={isDesktop ? "/static/icons/success-check.svg" : "/static/icons/mail-icon.svg"} alt="Verification image" />
        </div>
        <Typography align="center" component="p" className={classes.companyVerificationCompleteDescription}>
          {isDesktop ? t('company-register.step8.description3') : t('company-register.step8.description1')}
        </Typography>
        <Typography align="center" component="p" className={classes.companyVerificationCompleteDescription}>
          {isDesktop ? t('company-register.step8.description4') : t('company-register.step8.description2')}
        </Typography>
      </section>
    </Box>
  );
};
