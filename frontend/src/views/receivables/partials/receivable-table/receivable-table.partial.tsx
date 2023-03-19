import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { LoadingSkeleton, Table, TableColumnInterface } from 'modules/common/components';
import { useTranslation } from 'modules/common/hooks';
import { colors } from 'modules/common/utils/colors';
import { FormAlert } from 'modules/forms/components';
import { Order } from 'modules/payment-dashboard/interfaces';
import { ThemeEnum } from 'modules/theme/enums';
import React, { useMemo } from 'react';
import { useUserReceivables } from 'views/receivables/hooks';

const ColumnFieldTypography = ({ children }) => (
  <Typography sx={{ color: 'inherit' }} component="span">
    {children}
  </Typography>
);

const renderDeliveryDate = (rowData: Order) => (
  <ColumnFieldTypography>{dayjs(new Date(rowData.deliveryDate)).format('DD.MM.YYYY')}</ColumnFieldTypography>
);
const renderInvoiceDate = (rowData: Order) => (
  <ColumnFieldTypography>{dayjs(new Date(rowData.deliveryDate)).format('DD.MM.YYYY')}</ColumnFieldTypography>
);

const renderPaymentRequestStatus = (rowData: Order) => {
  if (rowData.status) {
    return <ColumnFieldTypography>{rowData.status}</ColumnFieldTypography>;
  }
  return <ColumnFieldTypography>Null</ColumnFieldTypography>;
};

const renderInvoiceNumber = (rowData: Order) => {
  if (rowData.invoiceNumber) {
    return <ColumnFieldTypography>{rowData.invoiceNumber}</ColumnFieldTypography>;
  }
  return <ColumnFieldTypography>Null</ColumnFieldTypography>;
};
const renderInvoiceAmount = (rowData: Order) => {
  if (rowData.invoiceAmount) {
    return <ColumnFieldTypography>{rowData.invoiceAmount}</ColumnFieldTypography>;
  }
  return <ColumnFieldTypography>Null</ColumnFieldTypography>;
};
const renderReceivableAmount = (rowData: Order) => {
  if (rowData.receivableAmount) {
    return <ColumnFieldTypography>{rowData.receivableAmount}</ColumnFieldTypography>;
  }
  return <ColumnFieldTypography>Null</ColumnFieldTypography>;
};

const renderPaymentTerm = (rowData: Order) => {
  if (rowData.paymentTerm) {
    return <ColumnFieldTypography>{rowData.paymentTerm}</ColumnFieldTypography>;
  }
  return <ColumnFieldTypography>Null</ColumnFieldTypography>;
};

export const ReceivableTablePartial = (): React.ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    isLoading,
    error,
    data,
    totalCount,
    pageNumber,
    pageSize,
    order,
    handleOrderChange,
    handlePageChange,
    accountName,
  } = useUserReceivables();

  const tableData = useMemo(() => data.map((orderData) => ({ ...orderData })), [data]);

  if (isLoading && !error) {
    return <LoadingSkeleton />;
  }

  if (!isLoading && error) {
    return <FormAlert error={error} severity="error" autoHideDuration={4000} />;
  }

  const ordersTableColumns: TableColumnInterface<Order>[] = [
    {
      title: t('invoice-number'),
      field: 'invoiceNumber',
      render: renderInvoiceNumber,
    },
    {
      title: t('invoice-amount'),
      field: 'invoiceAmount',
      render: renderInvoiceAmount,
    },
    {
      title: t('receivable-amount'),
      field: 'receivableAmount',
      render: renderReceivableAmount,
    },
    {
      title: t('invoice-date'),
      field: 'invoiceDate',
      render: renderDeliveryDate,
    },
    {
      title: t('delivery-date'),
      field: 'deliveryDate',
      render: renderInvoiceDate,
    },
    {
      title: t('payment-term'),
      field: 'paymentTerm',
      render: renderPaymentTerm,
    },
    {
      title: t('payment-status-text'),
      field: 'status',
      render: renderPaymentRequestStatus,
    },
  ];

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '22px',
          fontWeight: 500,
          color: colors.primary,
          marginBottom: '8px',
        }}
        component="h1"
      >
        {accountName ? accountName.split('-').join(' ') : accountName}
      </Typography>
      <Table
        page={pageNumber}
        onOrderChange={handleOrderChange}
        onPageChange={handlePageChange}
        order={order}
        totalCount={totalCount}
        columns={ordersTableColumns}
        isLoading={isLoading}
        data={tableData}
        options={{
          paginationType: 'stepped',
          pageSize,
          showTitle: false,
          search: false,
          sorting: true,
          toolbar: false,
          draggable: false,
          thirdSortClick: false,
          rowStyle: {
            color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.black : theme.palette.common.white,
          },
        }}
      />
    </Box>
  );
};
