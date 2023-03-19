import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { useTranslation } from 'next-i18next';
import React, { ReactElement } from 'react';
/* eslint-disable @roq/imports-should-follow-conventions  */
import { UserFilesPartial } from 'views/files/partials/user-files/user-files.partial';
/* eslint-enable @roq/imports-should-follow-conventions  */

export const FileView = withAuth()((): ReactElement => {
  const { t } = useTranslation();
  const breadcrumbs = useRouteBreadcrumbs();

  return (
    <MainLayout title={t('title_files')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <UserFilesPartial />
    </MainLayout>
  );
});
