import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useExampleBreadcrumbs } from 'modules/example/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useAuthorEditForm } from 'views/author-edit/hooks';
import { AuthorEditFormPartial } from 'views/author-edit/partials';

export const AuthorEditView = withAuth()(() => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const breadcrumbs = useExampleBreadcrumbs({ skipLast: 3 });

  const { handleAuthorEditForm, author, initialValues } = useAuthorEditForm(query.id as string);

  return (
    <MainLayout title={t('title_example')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      {author && <AuthorEditFormPartial onSubmit={handleAuthorEditForm} initialValues={initialValues} />}
    </MainLayout>
  );
});
