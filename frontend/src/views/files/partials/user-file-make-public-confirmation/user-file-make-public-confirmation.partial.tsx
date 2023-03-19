import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { FileInterface } from 'modules/user-files/interfaces';
import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';

interface UserFileDeleteConfirmationPropsInterface {
  file: FileInterface;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserFileMakePublicConfirmation = (props: UserFileDeleteConfirmationPropsInterface): ReactElement => {
  const { t } = useTranslation();
  const { file, onConfirm, onCancel, isLoading } = props;

  return (
    <ConfirmationModal
      data-cy="user-file-make-public-confirmation"
      title={t('file.make-file-public-title')}
      confirmationMesage={t('file.make-file-public-message', {
        fileName: file.name,
      })}
      confirmButtonProps={{
        onClick: onConfirm,
        children: t('file.make-file-public'),
        disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: onCancel,
        children: t('files.cancel'),
      }}
    />
  );
};
