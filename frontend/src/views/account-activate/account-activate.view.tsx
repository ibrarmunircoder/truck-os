/* eslint-disable @roq/view-correct-location-and-name */
/* name conflicting with other rule, 
(Error message is also not correct 
[error  Views should only have a single export and that should be the function component]) */

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { SwitchPageBlock } from 'modules/auth/components';
import { RoqLink } from 'modules/common/components';
import { Loader } from 'modules/common/components/loader';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { FunctionComponent } from 'react';
import routes from 'routes';
import { useAccountActivate, useCleanError } from 'views/account-activate/hooks';

export const AccountActivateView: FunctionComponent = () => {
  const { t } = useTranslation();
  useCleanError();
  const router = useRouter();
  const { token } = router.query;

  const { error, isLoading } = useAccountActivate(token as string);

  const BackLink = () => (
    <RoqLink href={{ route: routes.login }}>
      <Button variant="text" startIcon={<ArrowBackIosNewIcon />}>
        {t('go-to-login')}
      </Button>
    </RoqLink>
  );

  return (
    <AuthLayout noAside title={t('activate-roq-account')} ContentProps={{ stretched: true }} back={<BackLink />}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {isLoading && (
          <Typography component="h1" variant="h3" gutterBottom>
            {t('confirm-account')}
          </Typography>
        )}
      </Grid>

      <div>{isLoading && <Loader />}</div>

      <Grid container item direction="column" justifyContent="center" alignItems="center">
        {!isLoading && error && (
          <>
            <FormAlert message={t('email-confirmation-error')} severity="error" />
            <SwitchPageBlock align="center" sx={{ mt: 2 }} />
          </>
        )}
      </Grid>

      <Grid container item direction="column" justifyContent="center" alignItems="center">
        {!isLoading && !error && (
          <>
            <Typography variant="body1" align="center">
              {t('account-verified')}
            </Typography>
          </>
        )}
      </Grid>
    </AuthLayout>
  );
};
