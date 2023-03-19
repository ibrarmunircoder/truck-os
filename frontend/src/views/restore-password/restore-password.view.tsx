import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { AuthHeadingBlock } from 'modules/auth/components/auth-heading-block';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { ReactElement } from 'react';
import routes from 'routes';
import { useRestorePassword } from 'views/restore-password/hooks';
import { RestorePasswordFormPartial } from 'views/restore-password/partials';

export const RestorePasswordView = withAuth({ redirectIfAuthenticated: true })((): ReactElement => {
  const { t } = useTranslation();
  const { error, handleRestorePassword, tokenValidation, token } = useRestorePassword();
  const { isValid: isTokenValid, isExpired: isTokenExpired, email: userEmail, isLoading } = tokenValidation;

  const BackLink = () => (
    <RoqLink href={{ route: routes.login }}>
      <Button variant="text" startIcon={<ArrowBackIosNewIcon />}>
        {t('go-to-login')}
      </Button>
    </RoqLink>
  );

  return (
    <AuthLayout
      noAside
      title={t('roq-reset-password')}
      back={<BackLink />}
      ContentProps={{ stretched: true }}
    >
      <AuthHeadingBlock />
      <Typography component="h1" variant="h3" gutterBottom>
        {t('reset-password-cta')}
      </Typography>

      <Typography component="p" variant="body1" mb={4}>
        {t('reset-password-subheading')}
      </Typography>
      {(( !isLoading && !isTokenValid) || error) && <FormAlert severity="error" message={t('invalid-link-text')} />}
      {isTokenExpired && <FormAlert severity="error" message={t('expired-invitation-text')} />}

      <RestorePasswordFormPartial
        userEmail={userEmail}
        disabled={!isTokenValid || isTokenExpired || error}
        onSubmit={({ password }) => {
          handleRestorePassword({
            password,
            token,
          });
        }}
      />
      <Typography
        component="p"
        sx={{
          pt: 3,
          margin: '0 auto',
          display: {
            sm: 'flex',
            md: 'none',
          },
          justifyContent: 'center',
        }}
      >
        <RoqLink href={{ route: routes.login }}>{t('invalid-link-text')}</RoqLink>
      </Typography>
    </AuthLayout>
  );
});
