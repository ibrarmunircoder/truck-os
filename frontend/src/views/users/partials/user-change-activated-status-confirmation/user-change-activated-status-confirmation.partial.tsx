import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { SingleUserChangeActiveStatusActionEnum } from 'modules/users/slices';
import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';

interface UserChangeActivatedStatusConfirmationPropsInterface {
  currentOperation: SingleUserChangeActiveStatusActionEnum;
  onConfirm: () => Promise<string | Error>;
  onCancel: () => void;
  isLoading: boolean;
}

export const UserChangeActivatedStatusConfirmation = (
  props: UserChangeActivatedStatusConfirmationPropsInterface,
): ReactElement => {
  const { t } = useTranslation();
  const { currentOperation, onConfirm, onCancel, isLoading } = props;

  return (
    <ConfirmationModal
      data-cy={`user-${currentOperation}-status-confirmation`}
      confirmationMesage={t('user.change-status-message', { context: currentOperation })}
      confirmButtonProps={{
        onClick: onConfirm,
        children: t('user.status-change-modal.confirm'),
        disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: onCancel,
        children: t('user.status-change-modal.cancel'),
      }}
    />
  );
};
