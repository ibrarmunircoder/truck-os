import Grid from '@mui/material/Grid';
import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { useAuth, useDisconnectSsoProvider, usePasswordChange } from 'modules/auth/hooks';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { useTranslation } from 'modules/common/hooks';
import { NotificationPreferences } from 'modules/notification-preferences/components';
import { AppSettingsPartial, PasswordChangeFormPartial } from 'views/settings/partials';

export const SettingsView = withAuth()(() => {
  const { t } = useTranslation();
  const { user, providerId } = useAuth();
  const breadcrumbs = useRouteBreadcrumbs();

  const { disconnectSsoProvider } = useDisconnectSsoProvider();
  const { changePassword } = usePasswordChange();

  return (
    <MainLayout title={t('title_settings')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} lg={6}>
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid item xs={12}>
              <AppSettingsPartial user={user} />
            </Grid>
            <Grid item xs={12}>
              <PasswordChangeFormPartial
                user={user}
                onDisconnectProvider={disconnectSsoProvider}
                onPasswordChange={changePassword}
                providerId={providerId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <NotificationPreferences />
        </Grid>
      </Grid>
    </MainLayout>
  );
});
