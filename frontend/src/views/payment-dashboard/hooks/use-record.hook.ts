import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { useTranslation } from 'modules/common/hooks';
import { requestGql } from 'modules/common/utils/request-gql';
import { updateOrders } from 'modules/payment-dashboard/payment-dashboard.slice';
import { paymentDashboardOrdersSelector } from 'modules/payment-dashboard/selectors';
import { useDeleteFiles } from 'modules/user-files/hooks';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import { ButtonStatusBgEnum, DebtorStatusEnum, ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import {
  debtorDeniedStatuses,
  isDebtorDenied,
  isReceivableCompleted,
  isReceivableDenied,
  isReceivablePending,
  isReceivableUnpaid,
  paymentDeniedStatuses,
  paymentUnpaidStatus,
} from 'views/payment-dashboard/utils';

interface UseRecordHookInterface {
  isBtnStatusDisabled: boolean;
  btnStatusText: string | null;
  handleDialogClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleBtnStatusClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleResetError: () => void;
  handleOpenDeleteRequestModal: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleCloseDeleteRequestModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleConfirmDeleteRequestClick: (
    orderId: string,
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCardClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  open: boolean;
  isMoneyPendingIcon: boolean;
  openDeleteRequestModal: boolean;
  buttonBgColor: string;
  error: null;
}

type OrderFile = {
  id: string;
  name: string;
  url: string;
};

const deleteOrderMutationOptions = (id: string) => ({
  mutation: gql`
    mutation deleteOrder($id: ID!) {
      deleteOrder(id: $id)
    }
  `,
  variables: { id },
});

export const useRecord = (
  debtorStatus: DebtorStatusEnum,
  receivableStatus: ReceivableStatusEnum,
  draft: boolean,
  orderId: string,
  orderFiles: OrderFile[],
  invoiceNumber: string,
): UseRecordHookInterface => {
  const [open, setOpen] = useState(false);
  const [openDeleteRequestModal, setIsDeleteRequestModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const orders = useSelector(paymentDashboardOrdersSelector);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { deleteFiles } = useDeleteFiles();
  const { t } = useTranslation();

  const isMoneyPendingIcon = useMemo(
    () =>
      (draft && !receivableStatus) ||
      isReceivablePending(receivableStatus) ||
      isReceivableDenied(receivableStatus) ||
      (isDebtorDenied(debtorStatus) && !isReceivableCompleted(receivableStatus)),
    [debtorStatus, receivableStatus, draft],
  );

  const buttonBgColor = useMemo(
    () =>
      draft && !receivableStatus
        ? ButtonStatusBgEnum.SUCCESS
        : isReceivablePending(receivableStatus)
        ? ButtonStatusBgEnum.DEFAULT
        : isReceivableDenied(receivableStatus)
        ? ButtonStatusBgEnum.DANGER
        : isReceivableUnpaid(receivableStatus)
        ? ButtonStatusBgEnum.DEFAULT
        : ButtonStatusBgEnum.DEFAULT,
    [debtorStatus, receivableStatus, orderFiles, draft],
  );

  const isBtnStatusDisabled = useMemo(() => isReceivablePending(receivableStatus) && !isDebtorDenied(debtorStatus), [
    receivableStatus,
    debtorStatus,
  ]);

  const btnStatusText = useMemo(
    () =>
      draft && !receivableStatus
        ? t('payment-dashboard.payment-complete-request')
        : isDebtorDenied(debtorStatus) && !isReceivableCompleted(receivableStatus)
        ? t('payment-dashboard.debtor-denied')
        : isReceivablePending(receivableStatus)
        ? t('payment-dashboard.payment-pending')
        : isReceivableDenied(receivableStatus)
        ? t('payment-dashboard.payment-denied')
        : isReceivableUnpaid(receivableStatus)
        ? t('payment-dashboard.bank-account')
        : null,
    [debtorStatus, receivableStatus, orderFiles, draft],
  );

  const handleOpenDeleteRequestModal = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsDeleteRequestModalOpen(true);
  }, []);
  const handleCloseDeleteRequestModal = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setIsDeleteRequestModalOpen(false);
  }, []);

  const handleConfirmDeleteRequestClick = useCallback(
    (id: string) => async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      try {
        event.stopPropagation();
        const deletedOrderId = await requestGql(deleteOrderMutationOptions(id), null, 'deleteOrder');
        if (deletedOrderId && orderFiles.length) {
          await deleteFiles(orderFiles.map((file) => file.id));
        }
        const filteredOrders = orders.data.filter((order) => order.id !== deletedOrderId);
        dispatch(
          updateOrders({
            data: filteredOrders,
            totalCount: orders.totalCount - 1,
          }),
        );
      } catch (err) {
        console.error(err);
        setError(err);
      }
    },
    [orders],
  );

  const handleResetError = useCallback(() => setError(null), [setError]);

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (draft && !receivableStatus) return;
      void router.push({
        pathname: `${routes.invoiceDetails}/${orderId}`,
      });
    },
    [receivableStatus, debtorStatus],
  );

  const handleDialogClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setOpen(false);
    },
    [setOpen],
  );

  const handleDialogOpen = useCallback(() => setOpen(true), [setOpen]);

  const handleBtnStatusClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (draft && !receivableStatus && !invoiceNumber) {
      return router.push({
        pathname: routes.invoiceCreation,
        search: `?step=1&orderId=${orderId}`,
      });
    }
    if (draft && invoiceNumber && !receivableStatus && orderFiles.length < 2) {
      return router.push({
        pathname: routes.invoiceCreation,
        search: `?step=2&orderId=${orderId}`,
      });
    }
    if (
      (receivableStatus && paymentUnpaidStatus.includes(receivableStatus)) ||
      (receivableStatus && paymentDeniedStatuses.includes(receivableStatus)) ||
      debtorDeniedStatuses.includes(debtorStatus)
    ) {
      return handleDialogOpen();
    }

    await router.push({
      pathname: `${routes.confirmTransaction}/${orderId}`,
    });
  };

  return {
    isBtnStatusDisabled,
    btnStatusText,
    handleDialogClose,
    handleBtnStatusClick,
    handleCardClick,
    buttonBgColor,
    open,
    openDeleteRequestModal,
    handleOpenDeleteRequestModal,
    handleCloseDeleteRequestModal,
    handleConfirmDeleteRequestClick,
    isMoneyPendingIcon,
    handleResetError,
    error,
  };
};
