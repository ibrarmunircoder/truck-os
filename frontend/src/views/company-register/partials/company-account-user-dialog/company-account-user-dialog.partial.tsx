import { Box, Typography } from '@mui/material';
import { Button } from 'modules/common/components/button';
import React, { FunctionComponent } from 'react';
import { useCompanyAccountUserDialogStyles } from 'views/company-register/partials/company-account-user-dialog/company-account-user-dialog.styles';

interface CompanyAccountUserDialogPropsInterface {
  title: string;
  text: string;
  handleDialogClose: () => void;
  btnText: string;
}

export const CompanyAccountUserDialog: FunctionComponent<CompanyAccountUserDialogPropsInterface> = ({
  title,
  text,
  handleDialogClose,
  btnText,
}) => {
  const classes = useCompanyAccountUserDialogStyles();
  return (
    <Box className={classes.dialogContainer}>
      <Typography component="h2" className={classes.dialogContentTitle}>
        {title}
      </Typography>
      <Typography component="h2" className={classes.dialogContentDescription}>
        {text}
      </Typography>
      <Button
        className={classes.confirmButton}
        onClick={handleDialogClose}
        text={btnText}
        type="button"
        variant="contained"
      />
    </Box>
  );
};
