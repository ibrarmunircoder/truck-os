import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { PasswordValidationErrors } from 'modules/auth/components';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert, PasswordField } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import React, { FunctionComponent } from 'react';
import { useAcceptInviteFormSchema } from 'views/accept-invite/hooks/use-accept-invite-form-schema.hook';
import { useAcceptInviteFormStyles } from 'views/accept-invite/partials/accept-invite-form/accept-invite-form.styles';

export interface RestorePasswordFormValuesInterface {
  password: string;
  repeatPassword: string;
  subscribeToMail: boolean;
}

export interface RestorePasswordFormInterface {
  onSubmit: (formValues: RestorePasswordFormValuesInterface) => void;
  disabled: boolean;
  userEmail?: string;
}

const initialValues: RestorePasswordFormValuesInterface = {
  password: '',
  repeatPassword: '',
  subscribeToMail: true,
};

export const AcceptInviteFormPartial: FunctionComponent<RestorePasswordFormInterface> = (props) => {
  const { onSubmit, disabled, userEmail } = props;
  const { t } = useTranslation();
  const classes = useAcceptInviteFormStyles({
    width: 0,
  });

  const {
    handleSubmit,
    handleChange,
    values,
    visibleErrors,
    setFieldValue,
    handleBlur,
    isSubmitting,
    isValid,
    status,
    resetStatus,
  } = useEnhancedFormik({
    initialValues,
    onSubmit,
    validationSchema: useAcceptInviteFormSchema(),
  });

  return (
    <form onSubmit={handleSubmit}>
      {status && <FormAlert open message={t('invite-accepted-text')} error={status.error} onClose={resetStatus} />}

      <TextField
        type={'email'}
        value={userEmail}
        name={`email`}
        style={{ display: 'none' }}
        inputProps={{
          autoComplete: 'username',
        }}
      />

      <PasswordField
        disabled={disabled}
        name="password"
        label={t('input.set-password.placeholder')}
        value={values.password}
        error={Boolean(visibleErrors.password)}
        fullWidth
        inputProps={{
          autoComplete: 'new-password',
        }}
        onChange={handleChange}
        onReset={() => setFieldValue('password', '')}
        onBlur={handleBlur}
        variant="standard"
      />

      <PasswordField
        disabled={disabled}
        name="repeatPassword"
        label={t('input.confirm-password.placeholder')}
        value={values.repeatPassword}
        helperText={visibleErrors.repeatPassword}
        error={Boolean(visibleErrors.repeatPassword)}
        fullWidth
        inputProps={{
          autoComplete: 'new-password',
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
      />

      <Box className={classes.passwordValidationErrorsWrapper}>
        <PasswordValidationErrors
          label={t('input.new-password.placeholder')}
          value={values.password}
          rules={['len', 'uppercase', 'digit', 'character']}
        />
      </Box>

      <Button
        disabled={!isValid || isSubmitting || disabled}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 3.5 }}
      >
        {!isSubmitting && t('accept-invite-cta')}
        {isSubmitting && <CircularProgress size={22} />}
      </Button>
    </form>
  );
};
