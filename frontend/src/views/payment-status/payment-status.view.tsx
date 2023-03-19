import { Backdrop, CircularProgress } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard/dashboard.layout';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { withAuth } from 'modules/auth/hocs';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { invoiceCreationSelector, newDebtorEntrySelector } from 'modules/invoice-creation/selectors';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import routes from 'routes';
import { StatusViewPartial } from 'views/payment-status/partials';

export const PaymentStatusView = withAuth()(
  (): ReactElement => {
    const isDesktop = useMatchMediaQuery();
    const { isNewDebtorEntry } = useSelector(newDebtorEntrySelector);
    const { paymentDetails } = useSelector(invoiceCreationSelector);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
      if (paymentDetails === null) {
        setLoading(true);
        void router.replace({ route: routes.paymentDashboard });
      } else {
        setLoading(false);
      }
    }, [paymentDetails]);

    return (
      <DashboardLayout
        title={t('payment-status.page-title')}
        showMenus={false}
        stepper={false}
        innerPageTitle={true}
        pageSubTitle={loading ? t('please-wait') : t('payment-status.page-subtitle')}
        pageTitle={t('invoice-creation.title')}
        showBackButton={false}
      >
        {loading ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, left: isDesktop ? '260px' : 0 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <StatusViewPartial
            title={t('payment-status.status-title')}
            isDesktop={isDesktop}
            description={
              isNewDebtorEntry ? t('payment-status.debtor-description') : t('payment-status.status-description')
            }
          />
        )}
      </DashboardLayout>
    );
  },
);
