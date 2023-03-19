import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useExampleBreadcrumbs } from 'modules/example/hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useBookCreateForm } from 'views/book-create/hooks';
import { BookCreateFormPartial } from 'views/book-create/partials/book-create-form/book-create-form.partial';

export const BookCreateView = withAuth()(() => {
  const { t } = useTranslation();
  const breadcrumbs = useExampleBreadcrumbs({ skipLast: 2 });

  const { handleBookCreateForm } = useBookCreateForm();

  return (
    <MainLayout title={t('title_example')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <BookCreateFormPartial onSubmit={handleBookCreateForm} />
    </MainLayout>
  );
});
