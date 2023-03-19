import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useExampleBreadcrumbs } from 'modules/example/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useBookEditForm } from 'views/book-edit/hooks';
import { BookEditFormPartial } from 'views/book-edit/partials';

export const BookEditView = withAuth()(() => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const breadcrumbs = useExampleBreadcrumbs({ skipLast: 3 });

  const { handleBookEditForm, book, initialValues } = useBookEditForm(query.id as string);

  return (
    <MainLayout title={t('title_example')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      {book && <BookEditFormPartial onSubmit={handleBookEditForm} initialValues={initialValues} />}
    </MainLayout>
  );
});
