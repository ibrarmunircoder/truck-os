import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import React from 'react';
import { useAccountBasicSettingsInfo } from 'views/account-settings/hooks';
import { useCompanyVerificationInfo, useKycSubmit } from 'views/company-register/hooks';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { useCompanyVerificationInfoStyles } from 'views/company-register/partials/company-verification-info/company-verification-info.styles';

export const CompanyVerificationInfo = (): React.ReactElement => {
  const classes = useCompanyVerificationInfoStyles();
  const { contentSchemaOne, contentSchemaTwo } = useCompanyVerificationInfo();
  const { t } = useTranslation();
  const { error, handleResetError } = useKycSubmit();
  const { user } = useAccountBasicSettingsInfo();
  const isDesktop = useMatchMediaQuery();
  return (
    <Box className={classes.companyVerificationContainer}>
      <Grid container mb={3}>
        <Grid item xs={12}>
          <CompanyHeader title={isDesktop ? t('company-register.step7.title2') : t('company-register.step7.title')} />
        </Grid>
      </Grid>
      {error && <FormAlert error={error} onClose={handleResetError} autoHideDuration={2000} />}
      {isDesktop ? (
        <Grid container>
          <Grid item xs={12}>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph1')} {user && `${user.firstName} ${user.lastName}`},
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph2')}
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph3')}
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph4')}
            </Typography>
            <ul>
              <li>
                <Typography component="p" className={classes.paragraphText} mb={0}>
                  {t('company-register.step7.paragraph5')}
                </Typography>
              </li>
              <li>
                <Typography component="p" className={classes.paragraphText} mb={0}>
                  {t('company-register.step7.paragraph6')}
                </Typography>
              </li>
            </ul>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph7')}
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph8')}
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph9')}
            </Typography>
            <Typography component="p" className={classes.paragraphText}>
              {t('company-register.step7.paragraph10')}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={15}>
          <Grid item xs={12}>
            {contentSchemaOne.map((content) => (
              <Typography
                align="center"
                key={content.id}
                component="p"
                className={classes.companyVerificationInfoDescription}
              >
                {content.text}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            {contentSchemaTwo.map((content) => (
              <Typography
                align="center"
                key={content.id}
                component="p"
                className={classes.companyVerificationInfoDescription}
              >
                {content.text}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
