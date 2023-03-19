import { Box, Drawer, Typography } from '@mui/material';
import { useActionOverlayStyles } from 'modules/action-overlay/components/action-overlay/action-overlay.styles';
import { ActionOverlaySettingsInterface } from 'modules/action-overlay/interfaces/action-overlay-settings.interface';
import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { ConfirmationModalPropsInterface } from 'modules/common/components/confirmation-modal/confirmation-modal.component';
import { useTranslation } from 'modules/common/hooks';
import React, { ReactElement, useMemo, useState } from 'react';

// eslint-disable-next-line @roq/correct-export-name-components-layouts-actions
export interface ActionOverlayProps<TParams> extends Partial<ActionOverlaySettingsInterface<TParams>> {
  open?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  children?: JSX.Element | JSX.Element[];
}

export const ActionOverlay = <TParams extends unknown>({
  open,
  config,
  params,
  onClose,
  children,
}: ActionOverlayProps<TParams>): ReactElement => {
  const { t } = useTranslation();
  const classes = useActionOverlayStyles(
    useMemo(
      () => ({
        size: config?.size ?? 'medium',
      }),

      [config?.size],
    ),
  );
  const [closeConfirmationVisible, setCloseConfirmationVisible] = useState(false);
  const [formDirty, setFormDirty] = useState(false);

  const handleOverlayClose = () => {
    if (formDirty && (config?.closeConfirmationModal ?? true)) {
      setCloseConfirmationVisible(true);
    } else {
      setFormDirty(false);
      onClose();
    }
  };

  const handleCloseConfirm = () => {
    setCloseConfirmationVisible(false);
    setFormDirty(false);
    onClose();
  };

  const handleCloseCancel = () => setCloseConfirmationVisible(false);

  const ModalComponent = config?.modalComponent || Drawer;
  const modalProps = config?.modalProps || { anchor: 'right', classes: classes.modal };

  return (
    <>
      {closeConfirmationVisible && (
        <ConfirmationModal
          title={t('action-overlay.close-confirmation-modal.title')}
          message={t('action-overlay.close-confirmation-modal.message')}
          cancelButtonLabel={t('action-overlay.close-confirmation-modal.cancel')}
          confirmButtonLabel={t('action-overlay.close-confirmation-modal.confirm')}
          {...(config?.closeConfirmationModalProps?.(params) as ConfirmationModalPropsInterface)}
          onConfirm={handleCloseCancel}
          onCancel={handleCloseConfirm}
          onClose={handleCloseCancel}
        />
      )}
      <ModalComponent {...modalProps} open={open} onClose={handleOverlayClose}>
        <Box className={classes.body}>
          {config && (
            <>
              <Box className={classes.header}>
                {config.title && (
                  <Typography variant="h3" className={classes.title}>
                    {config.title}
                  </Typography>
                )}
                {config.subTitle && (
                  <Typography variant="h4" className={classes.subTitle}>
                    {config.subTitle}
                  </Typography>
                )}
              </Box>
              <Box className={classes.content}>{children}</Box>
            </>
          )}
        </Box>
      </ModalComponent>
    </>
  );
};
