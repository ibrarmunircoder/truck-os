/* eslint-disable @roq/view-correct-location-and-name */
/* name conflicting with other rule, 
(Error message is also not correct 
[error  Views should only have a single export and that should be the function component]) */

import Typography from '@mui/material/Typography';
import { AuthLayout } from 'layouts/auth';
import { Loader } from 'modules/common/components/loader';
import { RoqLink } from 'modules/common/components/roq-link';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';
import routes from 'routes';
import { useAccountActivateProviderLink, useCleanError } from 'views/account-activate-provider-link/hooks';
import { FormErrorPartial } from 'views/account-activate-provider-link/partials';

export const AccountActivateProviderLinkView: FunctionComponent = () => {
  const { t } = useTranslation();
  useCleanError();
  const router = useRouter();
  const { token, provider } = router.query;

  const { error, isLoading } = useAccountActivateProviderLink(token, provider);

  return (
    <AuthLayout title={t('roq-account-activate-provider-link')}>
      <div className="flex flex-col items-center">
        <Typography variant="h2" align="center">
          {t('confirm-account-provider-link')}
        </Typography>
        {isLoading && <Loader />}
        {!isLoading && error && <FormErrorPartial message={t('invalid-link-text')} />}
        {!isLoading && !error && (
          <>
            <Typography variant="body1">{t('provider-linked-account-verified')}</Typography>
            <div className="flex justify-center w-full">
              <RoqLink href={{ route: routes.login }}>
                <p className="text-blue-600 font-medium cursor-pointer">{t('sign-in')}</p>
              </RoqLink>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};
