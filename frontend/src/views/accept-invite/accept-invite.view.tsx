import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts';
import { AuthHeadingBlock,SwitchPageBlock } from 'modules/auth/components';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { ReactElement } from 'react';
import routes from 'routes';
import { useAcceptInvite } from 'views/accept-invite/hooks';
import { AcceptInviteFormPartial } from 'views/accept-invite/partials';

export const AcceptInviteView = withAuth({ redirectIfAuthenticated: true })((): ReactElement => {
  const { t } = useTranslation();
  const { handleAcceptInvite, tokenValidation, isLoading } = useAcceptInvite();
  const { isValid:isTokenValid, isExpired:isTokenExpired, email: userEmail} = tokenValidation;

  const BackLink = () => (
    <RoqLink href={{ route: routes.login }}>
      <Button variant="text" startIcon={<ArrowBackIosNewIcon />}>
        {t('cancel')}
      </Button>
    </RoqLink>
  );

  return (
    <AuthLayout
      noAside
      title={t('roq-accept-invite')}
      back={<BackLink />}
      footer={(<SwitchPageBlock registered/>)}
    >
      <AuthHeadingBlock/>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
      >
        {t('accept-invite-heading')}
      </Typography>
      <Typography component="p" gutterBottom>
        {t('accept-invite-subheading')}
      </Typography>
      {!isTokenValid && <FormAlert severity="error" message={t('invalid-link-text')} />}
      {isTokenExpired && <FormAlert severity="error" message={t('expired-invitation-text')} />}
      <AcceptInviteFormPartial
        userEmail={userEmail}
        disabled={!isTokenValid || isTokenExpired || isLoading}
        onSubmit={handleAcceptInvite}
      />
    </AuthLayout>
  );
});
