import { MainLayout } from 'layouts';
import { withAuth } from 'modules/auth/hocs';
import { useTranslation } from 'modules/common/hooks';
import React from 'react';
import { ReceivableTablePartial } from 'views/receivables/partials';

export const ReceivablesView = withAuth()(
  (): React.ReactElement => {
    const { t } = useTranslation();
    return (
      <MainLayout title={t('receivables')}>
        <ReceivableTablePartial />
      </MainLayout>
    );
  },
);
