import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useExampleBreadcrumbs } from 'modules/example/hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useAuthorCreateForm } from 'views/author-create/hooks';
import { AuthorCreateFormPartial } from 'views/author-create/partials';

export const AuthorCreateView = withAuth()(() => {
  const { t } = useTranslation();
  const breadcrumbs = useExampleBreadcrumbs({ skipLast: 2 });

  const { handleAuthorCreateForm } = useAuthorCreateForm();

  return (
    <MainLayout title={t('title_example')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <AuthorCreateFormPartial onSubmit={handleAuthorCreateForm} />
    </MainLayout>
  );
});
