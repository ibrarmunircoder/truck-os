import { AlertProps } from '@mui/lab';
import Alert from '@mui/material/Alert';
import React, { FunctionComponent } from 'react';
import { useStatusAlertStyles } from 'views/payment-dashboard/partials/status-alert/status-alert.styles';

export const StatusAlert: FunctionComponent<AlertProps> = ({ children, ...rest }): React.ReactElement => {
  const classes = useStatusAlertStyles();
  return (
    <Alert icon={false} className={classes.alertStatus} {...rest}>
      {children}
    </Alert>
  );
};
