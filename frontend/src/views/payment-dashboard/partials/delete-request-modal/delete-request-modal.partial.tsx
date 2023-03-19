import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import React, { FunctionComponent } from 'react';
import { useDeleteRequestModalStyles } from 'views/payment-dashboard/partials/delete-request-modal/delete-request-modal.styles';

interface DeleteRequestModalPropsInterface {
  handleCancelClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleConfirmClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DeleteRequestModal: FunctionComponent<DeleteRequestModalPropsInterface> = ({
  handleCancelClick,
  handleConfirmClick,
}): React.ReactElement => {
  const classes = useDeleteRequestModalStyles();
  return (
    <ConfirmationModal
      title="Delete request"
      confirmationMesage="Are you sure you want to delete the request? All entered information will be lost."
      cancelButtonProps={{
        onClick: handleCancelClick,
        children: 'Back',
        className: classes.cancelButton,
      }}
      confirmButtonProps={{
        onClick: handleConfirmClick,
        children: 'Delete',
        className: classes.confirmButton,
      }}
    />
  );
};
