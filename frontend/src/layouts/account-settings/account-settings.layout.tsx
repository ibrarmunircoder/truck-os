/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/imports-should-follow-conventions */
import { useAccountSettingsStyles } from 'layouts/account-settings/account-settings.styles';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { NavigationMenu } from 'layouts/dashboard/partials';
import Head from 'next/head';
import React, { FunctionComponent } from 'react';

interface AccountSettingsLayoutPropInterface {
  title: string;
  showMenus?: boolean;
}

export const AccountSettingsLayout: FunctionComponent<AccountSettingsLayoutPropInterface> = ({
  title,
  showMenus,
  children,
}): React.ReactElement => {
  const isDesktop = useMatchMediaQuery();
  const classes = useAccountSettingsStyles({ showMenus, isDesktop });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={classes.root}>
        {showMenus ? <NavigationMenu /> : !showMenus && isDesktop ? <NavigationMenu />: '' }
        {children}
      </main>
    </>
  );
};
