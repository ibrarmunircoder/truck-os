import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';
import { useDebtorModalStyles } from 'views/invoice-creation/partials/debtor-modal/debtor-modal.styles';

export interface DebtorModalPartialProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const DebtorModalPartial: FunctionComponent<DebtorModalPartialProps> = (props) => {
  const classes = useDebtorModalStyles();
  const { handleConfirm, handleCancel } = props;
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      title={t('invoice-creation.debtor-model.title')}
      confirmationMesage={t('invoice-creation.debtor-model.confirmation-message')}
      confirmButtonProps={{
        onClick: handleConfirm,
        children: t('invoice-creation.debtor-model.confirm-btn-text'),
        className: classes.confirmButton,
        // disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: handleCancel,
        children: t('invoice-creation.debtor-model.cancel-btn-text'),
        className: classes.cancelButton,
      }}
    />
  );
};
