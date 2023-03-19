import { useTranslation } from 'modules/common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { DebtorStatusEnum, ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import {
  isDebtorDenied,
  isReceivableCompleted,
  isReceivableDenied,
  isReceivablePending,
} from 'views/payment-dashboard/utils';

interface UsePaymentStatusDetailsHookInterface {
  statusTuple: string[];
  isMoneyPendingIcon: boolean;
  handleTooltipClose: () => void;
  handleTooltipOpen: () => void;
  openToolTip: boolean;
}

export const usePaymentStatusDetails = (
  receivableStatus: ReceivableStatusEnum,
  debtorStatus: DebtorStatusEnum,
): UsePaymentStatusDetailsHookInterface => {
  const [openToolTip, setOpenTooltip] = useState(false);
  const { t } = useTranslation();
  const isMoneyPendingIcon = useMemo(
    () =>
      isReceivablePending(receivableStatus) ||
      isReceivableDenied(receivableStatus) ||
      (isDebtorDenied(debtorStatus) && !isReceivableCompleted(receivableStatus)),
    [debtorStatus, receivableStatus],
  );

  const statusTuple = useMemo(
    () =>
      isDebtorDenied(debtorStatus) && !isReceivableCompleted(receivableStatus)
        ? [t('payment-dashboard.debtor-denied'), t('invoice-details.debtor-denied-description')]
        : isReceivablePending(receivableStatus)
        ? [t('payment-dashboard.payment-pending'), t('invoice-details.payment-pending-description')]
        : isReceivableCompleted(receivableStatus)
        ? [t('invoice-details.payment-completed-status'), t('invoice-details.payment-completed-description')]
        : isReceivableDenied(receivableStatus)
        ? [t('payment-dashboard.payment-denied'), t('invoice-details.payment-denied-description')]
        : [],
    [debtorStatus, receivableStatus],
  );

  const handleTooltipClose = useCallback(() => setOpenTooltip(false), [setOpenTooltip]);

  const handleTooltipOpen = useCallback(() => setOpenTooltip(true), [setOpenTooltip]);

  return {
    statusTuple,
    isMoneyPendingIcon,
    handleTooltipClose,
    handleTooltipOpen,
    openToolTip,
  };
};
