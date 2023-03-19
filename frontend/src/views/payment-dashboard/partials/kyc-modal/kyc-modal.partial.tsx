import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';
import { useKycModalStyles } from 'views/payment-dashboard/partials/kyc-modal/kyc-modal.styles';

export interface KycModalPartialProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const KycModalPartial: FunctionComponent<KycModalPartialProps> = (props) => {
  const classes = useKycModalStyles();
  const { handleConfirm, handleCancel } = props;
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      title={t('invoice-creation.kyc-modal.title')}
      confirmationMesage={t('invoice-creation.kyc-modal.confirmation-message')}
      confirmButtonProps={{
        onClick: handleConfirm,
        children: t('invoice-creation.kyc-modal.confirm-btn-text'),
        className: classes.confirmButton,
        // disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: handleCancel,
        children: t('invoice-creation.kyc-modal.cancel-btn-text'),
        className: classes.cancelButton,
      }}
    />
  );
};
