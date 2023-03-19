import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import { useActionOverlayButtonsStyles } from 'modules/action-overlay/components/action-overlay-buttons/action-overlay-buttons.styles';
import { useTranslation } from 'modules/common/hooks';
import React, { ReactElement } from 'react';

interface BasicProps {
  cancelButton?: ButtonProps;
  submitButton?: ButtonProps;
  onCancel: () => void;
  displaySubmitButton?: boolean;
  submitDisabled?: boolean;
  isSubmitting?: boolean;
}

export type ActionOverlayButtonsProps = BasicProps & BoxProps;
export const ActionOverlayButtons = (props: ActionOverlayButtonsProps): ReactElement => {
  const classes = useActionOverlayButtonsStyles();
  const { t } = useTranslation();
  const { children, onCancel, displaySubmitButton, submitDisabled, isSubmitting, cancelButton, submitButton } = props;

  return (
    <Box className={classes.wrapper} {...props}>
      <Grid container columnGap={1}>
        {displaySubmitButton && !children && (
          <>
            <Grid item xs="auto">
              {submitButton ? (
                submitButton
              ) : (
                <LoadingButton
                  loading={isSubmitting}
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={submitDisabled}
                >
                  {t('submit')}
                </LoadingButton>
              )}
            </Grid>
          </>
        )}

        {!children && (
          <>
            <Grid item xs="auto">
              {cancelButton ? (
                cancelButton
              ) : (
                <Button variant="outlined" size="large" type="button" onClick={onCancel}>
                  {t('cancel')}
                </Button>
              )}
            </Grid>
          </>
        )}
      </Grid>

      {children}
    </Box>
  );
};
