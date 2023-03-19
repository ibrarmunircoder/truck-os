import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { FileInterface } from 'modules/user-files/interfaces';
import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';

interface UserFileDeleteConfirmationPropsInterface {
  filesToDelete: FileInterface[];
  onConfirm: () => Promise<string | Error>;
  onCancel: () => void;
  isLoading: boolean;
}

export const UserFileDeleteConfirmation = (props: UserFileDeleteConfirmationPropsInterface): ReactElement => {
  const { t } = useTranslation();
  const { filesToDelete, onConfirm, onCancel, isLoading } = props;

  return (
    <ConfirmationModal
      data-cy="user-file-delete-confirmation"
      title={t('files.delete-file-title')}
      confirmationMesage={
        filesToDelete.length > 1
          ? t('files.confirm_bulk_deletion', { length: filesToDelete.length })
          : t('files.confirm_deletion', { fileName: filesToDelete[0].name })
      }
      confirmButtonProps={{
        onClick: onConfirm,
        children: t('files.delete'),
        disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: onCancel,
        children: t('files.cancel'),
      }}
    />
  );
};
