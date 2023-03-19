import { Grid } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard/dashboard.layout';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { withAuth } from 'modules/auth/hocs';
import { ExitPaymentModal } from 'modules/common/components/exit-payment-modal';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { useFetchDebtor } from 'modules/debtors/hooks';
import { FormAlert } from 'modules/forms/components';
import { addCustomerDetails, addDocuments, addPaymentDetails } from 'modules/invoice-creation/invoice-creation.slice';
import { invoiceCreationSelector } from 'modules/invoice-creation/selectors';
import { setUnfinishedRequest } from 'modules/invoice-creation/slices/form-step.slice';
import { setVirtualIbn } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { addDebtorData } from 'modules/selected-debtor/selected-debtor.slice';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import { CustomerDataPartial, PaymentTermPartial } from 'views/confirm-transaction/partials';
import { useFetchOrder } from 'views/invoice-creation/hooks';

export const ConfirmTransactionView = withAuth()(
  (): ReactElement => {
    const isDesktop = useMatchMediaQuery();
    const { customerDetails, paymentDetails } = useSelector(invoiceCreationSelector);
    const router = useRouter();
    const { id: orderId } = router.query;
    const dispatch = useDispatch();
    const { handleFetchOrder } = useFetchOrder();
    const { fetchSingleDebtor } = useFetchDebtor();
    const { t } = useTranslation();
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [previousRoute, setPreviousRoute] = useState(null);
    const [isError, setIsError] = useState(null)

    useEffect(() => {
      if (orderId) {
        const fetchOrderDetails = async () => {
          try {
            const order = await handleFetchOrder(orderId as string);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { debtor, debtorRepresentative, orderFiles, ...orderDetails } = order;
            dispatch(
              addPaymentDetails({
                ...orderDetails,
              }),
            );
            
            const getDebtorData = await fetchSingleDebtor(debtor?.id);
            dispatch(addDebtorData(getDebtorData.debtor));     
            dispatch(addDocuments({ files: order.orderFiles }));
            setPreviousRoute(`/${routes.invoiceCreation}?step=2&orderId=${orderId}`);
            
            const debtorDetails = {
              ...debtor,
              representative: debtorRepresentative,
            };
            dispatch(addCustomerDetails(debtorDetails));
          } catch (error) {
            console.error(error);
            setIsError(error)
            setTimeout(() => router.push({ route: routes.paymentDashboard }), 3000);
          }
        };
        void fetchOrderDetails();
        void dispatch(setVirtualIbn(false));

        void dispatch(setUnfinishedRequest(true));
      }
      
      return () => {        
        void dispatch(setUnfinishedRequest(false));
      }
    }, [orderId]);

    const handleExit = () => {
      setIsExitModalOpen(true);
    };

    const handleExitAction = () => {
      void router.push({ route: routes.paymentDashboard });
    };

    const resetError = () => {
      setIsError(null);
    };

    return (
      <DashboardLayout
        title={t('confirm-transaction.page-main-title')}
        showMenus={false}
        stepper={false}
        pageTitle={t('confirm-transaction.page-title')}
        pageSubTitle={t('confirm-transaction.page-sub-title')}
        innerPageTitle={true}
        showExit={true}
        handleExit={handleExit}
        previousRoute={previousRoute}
      >
        <Grid container padding="18px">
          <Grid item xs={12} style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Grid container columnSpacing={3} flexDirection={{ xs: 'column', md: 'row-reverse' }}>
              <Grid item xs={12} lg={6}>
                <CustomerDataPartial customerDetails={customerDetails} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <PaymentTermPartial isDesktop={isDesktop} paymentDetails={paymentDetails} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {isExitModalOpen ? (
          <ExitPaymentModal handleConfirm={handleExitAction} handleCancel={() => setIsExitModalOpen(false)} />
        ) : (
          ''
        )}
        {isError && <FormAlert error={isError} onClose={resetError} autoHideDuration={3000} />}
      </DashboardLayout>
    );
  },
);
