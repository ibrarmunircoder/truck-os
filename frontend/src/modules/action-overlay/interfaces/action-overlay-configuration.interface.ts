import { ButtonProps, ModalProps } from '@mui/material';
import { ActionOverlayContentRendererPropsInterface } from 'modules/action-overlay/interfaces/action-overlay-content-renderer-props.interface';
import { ActionOverlaySize } from 'modules/action-overlay/types';
import { ConfirmationModalPropsInterface } from 'modules/common/components/confirmation-modal/confirmation-modal.component';
import { ComponentType, ReactElement } from 'react';

export interface ActionOverlayConfigurationInterface<
  TParams,
  TData,
  TFormValues,
> {
  title: string | ((data: TData) => string);
  subTitle?: string | ((data: TData) => string);
  size?: ActionOverlaySize;
  contentRenderer?: (props: ActionOverlayContentRendererPropsInterface<TData, TFormValues>) => ReactElement;
  buttons?: {
    cancel?: Partial<ButtonProps>;
    submit?: Partial<ButtonProps>;
  };
  modalComponent?: ComponentType<ModalProps>;
  modalProps?: unknown;
  closeConfirmationModal?: boolean;
  closeConfirmationModalProps?: (params: TParams | TParams[]) => Partial<ConfirmationModalPropsInterface>;
}
