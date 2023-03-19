/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/correct-export-name-components-layouts-actions */
import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { useExitPaymentModalStyles } from 'modules/common/components/exit-payment-modal/exit-payment-modal.styles';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';

export interface ExitPaymentModalProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const ExitPaymentModal: FunctionComponent<ExitPaymentModalProps> = (props) => {
  const classes = useExitPaymentModalStyles();
  const { handleConfirm, handleCancel } = props;
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      title={t('invoice-creation.exist-payment-modal.title')}
      confirmationMesage={t('invoice-creation.exist-payment-modal.confirmation-message')}
      confirmButtonProps={{
        onClick: handleConfirm,
        children: t('invoice-creation.exist-payment-modal.confirm-btn-text'),
        className: classes.confirmButton,
        // disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: handleCancel,
        children: t('invoice-creation.exist-payment-modal.cancel-btn-text'),
        className: classes.cancelButton,
      }}
    />
  );
};
