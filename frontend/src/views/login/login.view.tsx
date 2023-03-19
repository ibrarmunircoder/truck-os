import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { SwitchPageBlock } from 'modules/auth/components';
import { AuthHeadingBlock } from 'modules/auth/components/auth-heading-block';
import { withAuth } from 'modules/auth/hocs';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { ReactElement } from 'react';
import { useLogin, useResetError } from 'views/login/hooks';
import { LoginFormPartial } from 'views/login/partials';

export const LoginView = withAuth({ redirectIfAuthenticated: true })((): ReactElement => {
  useResetError();

  const { t } = useTranslation();
  const { error, resetError, handleLogin } = useLogin();

  return (
    <AuthLayout title={t('login')} aside={<SwitchPageBlock />}>
      <AuthHeadingBlock>
        <Typography component="h1" variant="h3" gutterBottom>
          {t('login')}
        </Typography>

        <Typography component="p" variant="body1">
          {t('login-subheading')}
        </Typography>
      </AuthHeadingBlock>
      {error && <FormAlert error={new Error(t('login-error-msg1'))} onClose={resetError} data-cy="form-alert-login-error" />}
      <LoginFormPartial onSubmit={handleLogin} />
    </AuthLayout>
  );
});
