import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { ReactElement } from 'react';
import routes from 'routes';
import { useForgotPassword } from 'views/forgot-password/hooks';
import { ForgotPasswordConfirmPartial, ForgotPasswordFormPartial } from 'views/forgot-password/partials';

export const ForgotPasswordView = withAuth({ redirectIfAuthenticated: true })((): ReactElement => {
  const { t } = useTranslation();
  const { handleForgotPassword, email, isSubmitted } = useForgotPassword();

  const BackLink = () => (
    <RoqLink href={{ route: routes.login }}>
      <Button variant="text" startIcon={<ArrowBackIosNewIcon />}>
        {t('go-to-login')}
      </Button>
    </RoqLink>
  );

  return (
    <AuthLayout noAside title={t('reset-password')} ContentProps={{ stretched: true }} back={<BackLink />}>
      {isSubmitted ? (
        <ForgotPasswordConfirmPartial email={email} />
      ) : (
        <>
          <Typography component="h1" variant="h3" gutterBottom>
            {t('reset-password')}
          </Typography>

          <Typography component="p" variant="body1" pb={6}>
            {t('reset-password-subheading')}
          </Typography>

          <ForgotPasswordFormPartial onSubmit={handleForgotPassword} />
        </>
      )}
    </AuthLayout>
  );
});
