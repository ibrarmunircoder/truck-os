import dayjs from 'dayjs';
import { DashboardLayout } from 'layouts/dashboard';
import { withAuth } from 'modules/auth/hocs';
import { Loader } from 'modules/common/components/loader';
import { FormAlert } from 'modules/forms/components';
import React from 'react';
import { useInvoiceDetails } from 'views/invoice-details/hooks';
import { PaymentStatusDetails } from 'views/invoice-details/partials';

export const InvoiceDetailsView = withAuth()(
  (): React.ReactElement => {
    const { error, loading, order } = useInvoiceDetails();

    if (!error && loading) {
      return <Loader />;
    }

    if (error && !loading) {
      return <FormAlert error={error} autoHideDuration={4000} />;
    }

    if (!order) {
      return null;
    }

    return (
      <DashboardLayout
        title="Invoice Details"
        showMenus={false}
        stepper={false}
        pageTitle={order.debtor.name}
        pageSubTitle={dayjs(new Date(order.deliveryDate)).format('DD.MM.YYYY')}
        innerPageTitle={true}
        showExit={false}
      >
        <PaymentStatusDetails order={order} />
      </DashboardLayout>
    );
  },
);
