import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { DashboardLayout } from 'layouts/dashboard';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components';
import { Button } from 'modules/common/components/button';
import { StepperComponent } from 'modules/common/components/stepper';
import { useTranslation } from 'modules/common/hooks';
import PendingIcon from 'modules/common/icons/pending-icon.svg';
import { colors } from 'modules/common/utils/colors';
import React from 'react';
import routes from 'routes';
import { useAccountPending } from 'views/account-pending/hooks';

const useAccountPendingStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: '30px 40px 30px 40px',
    backgroundColor: colors.white,
    [theme.breakpoints.up('md')]: {
      maxWidth: '1000px',
      margin: '0px auto',
      paddingTop: '40px'
    },
    [theme.breakpoints.only('xs')]: {
      padding: '14px',
    },
  },
  accountPendingHeader: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    textAlign: 'center',
    color: colors.black,
  },
  accountPendingImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountPendingDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'center',
    color: colors.darkGray,
  },
  accountPendingPhoneNumber: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'center',
    color: colors.primary,
    display: 'block',
  },
  companyRegisterCloseIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '30px',
    }
  },
}));

export const AccountPendingView = withAuth()(
  (): React.ReactElement => {
    const { steps, handleBackClick } = useAccountPending();
    const { t } = useTranslation();
    const classes = useAccountPendingStyles();
    return (
      <DashboardLayout title="Account Pending" showMenus={false} stepper={true} innerPageTitle={false}>
        <main className={classes.root}>
          <div className={classes.companyRegisterCloseIcon}>
            <RoqLink href={{ route: routes.paymentDashboard }}>
              <img src="/static/icons/x-close.svg" alt="Close icon" />
            </RoqLink>
          </div>
          <StepperComponent steps={steps} activeStep={4} />
          <Grid container>
            <Grid xs={12}>
              <Typography className={classes.accountPendingHeader} component="h1">
                {t('company-register.step8.title')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container mt={20} px={4}>
            <Grid xs={12}>
              <div className={classes.accountPendingImage}>
                <PendingIcon />
              </div>
            </Grid>
            <Grid xs={12}>
              <Typography
                component="h3"
                className={classes.accountPendingDescription}
                sx={{ margin: '45px 0px 20px 0px' }}
              >
                {t('account-pending.description-one')}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography className={classes.accountPendingDescription} component="h3" sx={{ marginBottom: '80px' }}>
                {t('account-pending.description-two')}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography className={classes.accountPendingPhoneNumber} component="span">
              +49 221 98819386
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography className={classes.accountPendingDescription} component="h5" my="15px">
                {t('account-pending.question')}
              </Typography>
            </Grid>
          </Grid>
          <Button
            onClick={handleBackClick}
            type="button"
            style={{ borderRadius: '10px' }}
            variant="contained"
            fullWidth
            text={t('account-pending.back-btn')}
          />
        </main>
      </DashboardLayout>
    );
  },
);
