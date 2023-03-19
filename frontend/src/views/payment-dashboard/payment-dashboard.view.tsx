import { DashboardLayout } from 'layouts/dashboard/dashboard.layout';
import { withAuth } from 'modules/auth/hocs';
import { useTranslation } from 'modules/common/hooks';
import { clearInvoiceForm } from 'modules/invoice-creation/invoice-creation.slice';
import { clearFormSteps } from 'modules/invoice-creation/slices/form-step.slice';
import { setIsDebtorExist, setIsNewDebtorEntry } from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import { resetStepsVerified } from 'modules/invoice-creation/slices/steps-verified.slice';
import { setVirtualIbn } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { addDebtorData } from 'modules/selected-debtor/selected-debtor.slice';
import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAccountCompanyDetails } from 'views/account-settings/hooks';
import { usePaymentDashboardFetchAccount } from 'views/payment-dashboard/hooks';
import { PaymentViewPartial } from 'views/payment-dashboard/partials';

export const PaymentDashboardView = withAuth()(
  (): ReactElement => {
    const { handleFetchAccount } = usePaymentDashboardFetchAccount();
    const { handleBackButtonClick } = useAccountCompanyDetails();
    const { t } = useTranslation();

    useEffect(() => {
      void handleFetchAccount();
    }, [handleFetchAccount]);

    const dispatch = useDispatch();

    useEffect(() => {
      void dispatch(setVirtualIbn(false));
      void dispatch(clearInvoiceForm());
      void dispatch(clearFormSteps());
      void dispatch(setIsNewDebtorEntry(false));
      void dispatch(resetStepsVerified());
      // reset saved debtor info
      void dispatch(addDebtorData(null));
      void dispatch(setIsDebtorExist(false));
      // reset account setting steps
      void handleBackButtonClick();
    }, []);

    return (
      <DashboardLayout title={t('payment-dashboard.title')} showMenus={true} stepper={false} innerPageTitle={false}>
        <PaymentViewPartial />
      </DashboardLayout>
    );
  },
);
