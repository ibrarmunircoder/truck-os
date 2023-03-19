import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { SwitchPageBlock } from 'modules/auth/components';
import { AuthHeadingBlock } from 'modules/auth/components/auth-heading-block';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { ReactElement } from 'react';
import routes from 'routes';
import { useRegister, useResetError } from 'views/register/hooks';
import { RegisterConfirmPartial, RegisterFormPartial } from 'views/register/partials';

export const RegisterView = withAuth({ redirectIfAuthenticated: true })((): ReactElement => {
  useResetError();

  const { error, resetError, email, isSubmitted, handleRegister } = useRegister();
  const { t } = useTranslation();

  const BackLink = () => (
    <RoqLink href={{ route: routes.login }}>
      <Button variant="text" startIcon={<ArrowBackIosNewIcon />}>
        {t('go-to-login')}
      </Button>
    </RoqLink>
  );

  return (
    <AuthLayout noAside title={t('register')} back={<BackLink />} footer={<SwitchPageBlock registered />}>
      {isSubmitted ? (
        <RegisterConfirmPartial email={email} />
      ) : (
        <>
          <AuthHeadingBlock>
            <Typography component="h1" variant="h3" gutterBottom>
              {t('register')}
            </Typography>
            <Typography variant='body1' sx={{ mb: 3, display: { xs: 'none', sm: 'inherit' } }}>
              {t('register-motivator-text')}
            </Typography>
          </AuthHeadingBlock>
          {error && <FormAlert error={new Error(t('register-error-msg1'))} onClose={resetError} />}
          <RegisterFormPartial onSubmit={handleRegister} />
          {/* <LoginProviders sx={{ pt: 6, pb: 6 }} /> */}
        </>
      )}
    </AuthLayout>
  );
});
