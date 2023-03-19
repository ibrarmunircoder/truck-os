import Alert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { ErrorAlert } from 'modules/common/components/error-alert/error-alert.component';
import { useFormAlertStyles } from 'modules/forms/components/form-alert/form-alert.styles';
import React, { FunctionComponent, ReactNode } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormAlertInterface extends SnackbarProps {
  partialSuccess?: boolean;
  message?: ReactNode;
  error?: any | null;
  severity?: AlertColor;
}

/* eslint-enable @typescript-eslint/no-explicit-any */

export const FormAlert: FunctionComponent<FormAlertInterface> = (props) => {
  const { message, error, severity, partialSuccess, ...rest } = props;
  const alertProps = { variant: 'filled', sx: { width: '100%' } } as AlertProps;
  const classes = useFormAlertStyles();

  return (
    <Snackbar
      open
      {...rest}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.snackbar}
    >
      {partialSuccess ? (
        <span>
          {message && (
            <Alert data-cy={`${props['data-cy']}-success`} severity="success" {...alertProps}>
              {message}
            </Alert>
          )}
          {error && (
            <ErrorAlert
              data-cy={`${props['data-cy']}-error`}
              error={error}
              {...alertProps}
              sx={{ mt: '2%', width: '100%' }}
            />
          )}
        </span>
      ) : error ? (
        <span>
          <ErrorAlert data-cy={`${props['data-cy']}-error`} error={error} {...alertProps} />
        </span>
      ) : (
        message && (
          <Alert data-cy={`${props['data-cy']}-success`} severity={severity || 'success'} {...alertProps}>
            {message}
          </Alert>
        )
      )}
    </Snackbar>
  );
};
