import { Backdrop, Button, ButtonProps, DialogProps, Modal, ModalProps, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { useConfirmationModalStyles } from 'modules/common/components/confirmation-modal/confirmation-modal.styles';
import { useTranslation } from 'modules/common/hooks';
import { ReactElement, ReactNode } from 'react';

export interface ConfirmationModalPropsInterface {
  title?: string;
  message?: ReactNode;
  isLoading?: boolean;
  dialogProps?: DialogProps;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmButtonLabel?: ReactNode;
  cancelButtonLabel?: ReactNode;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  confirmationMesage: string | ReactNode;
  popupModalProps?: ModalProps;
}

export const ConfirmationModal = (props: ConfirmationModalPropsInterface): ReactElement => {
  const {
    title,
    confirmationMesage,
    confirmButtonProps: { children: confirmButtonChildren, ...confirmButtonRestProps },
    cancelButtonProps: { children: cancelButtonChildren, ...cancelButtonRestProps },
    popupModalProps,
  } = props;
  const isDesktop = useMatchMediaQuery();
  const classes = useConfirmationModalStyles({ isDesktop });
  const { t } = useTranslation();

  return (
    <Modal
      open
      // onClose={cancelButtonRestProps?.onClick}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      aria-describedby="modal-description"
      {...(!!popupModalProps && popupModalProps)}
    >
      <Box className={classes.confirmModal} data-cy={`${props['data-cy']}-root`}>
        {title && (
          <Typography id="modal-modal-title" className={classes.confirmTitle} variant="h4" component="h2">
            {title}
          </Typography>
        )}
        <Typography variant="body2" id="modal-description" className={classes.confirmMessage}>
          {confirmationMesage || t('confirmation-modal.message.default')}
        </Typography>

        <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center">
          <Button variant="text" {...cancelButtonRestProps} data-cy={`${props['data-cy']}-cancel-btn`}>
            {cancelButtonChildren || t('confirmation-modal.buttons.cancel.text')}
          </Button>
          <Button variant="contained" {...confirmButtonRestProps} data-cy={`${props['data-cy']}-confirm-btn`}>
            {confirmButtonChildren || t('confirmation-modal.buttons.confirm.text')}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
