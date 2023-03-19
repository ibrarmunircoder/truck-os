import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useExampleBreadcrumbs } from 'modules/example/hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BooksTablePartial } from 'views/books/partials';

export const BooksView = withAuth()((): React.ReactElement => {
  const { t } = useTranslation();
  const breadcrumbs = useExampleBreadcrumbs({ skipLast: 1 });

  return (
    <MainLayout title={t('title_example')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <BooksTablePartial />
    </MainLayout>
  );
});
