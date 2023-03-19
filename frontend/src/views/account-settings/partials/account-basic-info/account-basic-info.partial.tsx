import { Dialog, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'modules/common/hooks';
import React, { FunctionComponent } from 'react';
import { useAccountBasicSettingsInfo, useAccountCompanyDetails } from 'views/account-settings/hooks';
import { AccountActions } from 'views/account-settings/partials';
import { useAccountBasicInfoStyles } from 'views/account-settings/partials/account-basic-info/account-basic-info.styles';

interface AccountBasicInfoPropsInterface {
  isDesktop?: boolean;
}

export const AccountBasicInfo: FunctionComponent<AccountBasicInfoPropsInterface> = ({
  isDesktop,
}): React.ReactElement => {
  const classes = useAccountBasicInfoStyles({ isDesktop });
  const { accountRecord: account } = useAccountCompanyDetails();

  const {
    handleActionClick,
    handleAccountLogout,
    user,
    open,
    handleDialogClose,
    handleContactUs,
    telephoneAnchorRef,
    accountActionsConfig,
  } = useAccountBasicSettingsInfo();
  const { t } = useTranslation();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" className={classes.accountBasicInfoPageTitle}>
            {t('account-settings.title')}
          </Typography>
        </Grid>
      </Grid>
      {!isDesktop && (
        <Grid container px={3}>
          <Grid item xs={12}>
            <Box className={classes.userDetail}>
              <Avatar className={classes.accountBasicInfoAvatar} src="/static/icons/avatar.svg" />
              <Box>
                <Typography className={classes.accountBasicInfoProfileHeader} component="h2">
                  {user && `${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography className={classes.accountBasicInfoProfileHeader} mt="15px" component="h2">
                  {account && account.companyName}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid container className={classes.accountSettingOptions}>
        {accountActionsConfig.map((config, index) => (
          <Grid
            item
            className={classes.accountItem}
            xs={12}
            key={config.id}
            flex={isDesktop && index === 2 ? 1 : 'inherit'}
          >
            <AccountActions
              isChevron
              iconAlt={config.iconAlt}
              icon={config.icon}
              title={config.title}
              onClick={handleActionClick(config.newSettingsView)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <AccountActions
            isGreen={true}
            title={t('account-settings.section3.label')}
            icon="/static/icons/contact-headphone.svg"
            iconAlt="Contact Us Icon"
            onClick={handleContactUs}
          />
        </Grid>
        <Grid item xs={12}>
          <AccountActions
            isGreen={true}
            title={t('account-settings.section4.label')}
            icon="/static/icons/logout.svg"
            iconAlt="Logout Icon"
            onClick={handleAccountLogout}
          />
        </Grid>
      </Grid>
      <a ref={telephoneAnchorRef} href="tel:+4922198819386" hidden={true}>
        +49 221 98819386
      </a>
      {open && (
        <Dialog className={classes.contactDialog} open={open} title="" onClose={handleDialogClose}>
          <Box padding={3} className={classes.dialogBox}>
            <Typography component="h2" className={classes.dialogContentTitle}>
              {t('account-settings.contact-modal.title')}
            </Typography>
            <p aria-label="plus 4 9 2 2 1 9 8 8 1 9 3 8 6" className={classes.dialogContentPhoneNumber}>
              +49 221 98819386
            </p>
            <Typography className={classes.dialogContentDescription} component="p">
              {t('account-settings.contact-modal.description')}
            </Typography>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};
