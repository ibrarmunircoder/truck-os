import Alert, { AlertProps } from '@mui/material/Alert';
import { useTranslation } from 'modules/common/hooks';
import { ComplexError } from 'modules/common/types';
import { formatErrorMessage } from 'modules/common/utils/';
import React, { FunctionComponent } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorAlertInterface extends AlertProps {
  error: ComplexError | { message: string } | null;
}

export const ErrorAlert: FunctionComponent<ErrorAlertInterface> = (props) => {
  const { error, ...alertProps } = props;
  const { t } = useTranslation();
  return (
    <Alert severity="error" {...alertProps}>
      {formatErrorMessage(error, t)}
    </Alert>
  );
};
