import { AccountSettingsLayout } from 'layouts/account-settings';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { withAuth } from 'modules/auth/hocs';
import React from 'react';
import { useAccountSettings } from 'views/account-settings/hooks/use-account-settings.hook';
import {
  AccountBasicInfo,
  AccountCompanyDetails,
  AccountTermsConditions,
  LanguageSettings,
} from 'views/account-settings/partials';

const _renderAccountSettingsView = (currentAccountSettingsView: number, isDesktop: boolean) => {
  switch (currentAccountSettingsView) {
    case 0:
      return <AccountBasicInfo isDesktop={isDesktop} />;
    case 1:
      return <AccountCompanyDetails isDesktop={isDesktop} />;
    case 2:
      return <LanguageSettings isDesktop={isDesktop} />;
    case 3:
      return <AccountTermsConditions isDesktop={isDesktop} />;
    default:
      return <p>Not Found</p>;
  }
};

export const AccountSettingsView = withAuth()(
  (): React.ReactElement => {
    const isDesktop = useMatchMediaQuery();
    const { currentAccountSettingsView } = useAccountSettings();
    return (
      <AccountSettingsLayout title="Account Settings" showMenus={true}>
        {_renderAccountSettingsView(currentAccountSettingsView, isDesktop)}
      </AccountSettingsLayout>
    );
  },
);
