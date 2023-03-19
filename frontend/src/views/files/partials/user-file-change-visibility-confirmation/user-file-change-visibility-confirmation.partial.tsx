import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { FileVisibilityStatusEnum } from 'modules/user-files/enums';
import { FileInterface } from 'modules/user-files/interfaces';
import { useTranslation } from 'next-i18next';
import { ReactElement } from 'react';

interface UserFileChangeVisibilityConfirmationPropsInterface {
  file: FileInterface;
  visibilityStatus: FileVisibilityStatusEnum;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserFileChangeVisibilityConfirmation = (
  props: UserFileChangeVisibilityConfirmationPropsInterface,
): ReactElement => {
  const { t } = useTranslation();
  const { file, onConfirm, onCancel, isLoading, visibilityStatus } = props;
  /*
   t('file.make-file-public-title')
   t('file.make-file-private-title')
   t('file.make-file-public-message')
   t('file.make-file-private-message')
   t('file.make-file-public')
   t('file.make-file-private')
 */
  return (
    <ConfirmationModal
      data-cy={props['data-cy']}
      title={t(`file.make-file-${visibilityStatus}-title`)}
      confirmationMesage={t(`file.make-file-${visibilityStatus}-message`, {
        fileName: file.name,
      })}
      confirmButtonProps={{
        onClick: onConfirm,
        children: t(`file.make-file-${visibilityStatus}`),
        disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: onCancel,
        children: t('files.cancel'),
      }}
    />
  );
};
