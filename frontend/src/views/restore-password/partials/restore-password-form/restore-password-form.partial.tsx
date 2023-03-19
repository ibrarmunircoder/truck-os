import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { PasswordValidationErrors } from 'modules/auth/components';
import { useTranslation } from 'modules/common/hooks';
import { PasswordField } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { FunctionComponent } from 'react';
import { useRestorePasswordFormSchema } from 'views/restore-password/hooks';
import { useRestorePasswordFormStyles } from 'views/restore-password/partials/restore-password-form/restore-password-form.styles';

export interface RestorePasswordFormValuesInterface {
  password: string;
  repeatPassword: string;
}

export interface RestorePasswordFormInterface {
  onSubmit: (formValues: RestorePasswordFormValuesInterface) => void;
  disabled: boolean;
  userEmail?: string;
}

const initialValues: RestorePasswordFormValuesInterface = {
  password: '',
  repeatPassword: '',
};

export const RestorePasswordFormPartial: FunctionComponent<RestorePasswordFormInterface> = (props) => {
  const { onSubmit, disabled, userEmail } = props;

  const classes = useRestorePasswordFormStyles({ width: 100 });

  const { t } = useTranslation();

  const { handleSubmit, handleChange, values, visibleErrors, setFieldValue, handleBlur, isSubmitting, isValid } =
    useEnhancedFormik({
      initialValues,
      onSubmit,
      validationSchema: useRestorePasswordFormSchema(),
    });

  return (
    <form onSubmit={handleSubmit}>
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
        name="password"
        label={t('input.new-password.placeholder')}
        value={values.password}
        error={Boolean(visibleErrors.password)}
        fullWidth
        inputProps={{
          autoComplete: 'new-password',
        }}
        onChange={handleChange}
        onReset={() => setFieldValue('password', '')}
        onBlur={handleBlur}
        disabled={disabled}
        variant="standard"
      />

      <PasswordField
        name="repeatPassword"
        label={t('input.confirm-new-password.placeholder')}
        value={values.repeatPassword}
        helperText={visibleErrors.repeatPassword}
        error={Boolean(visibleErrors.repeatPassword)}
        fullWidth
        inputProps={{
          autoComplete: 'new-password',
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
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
        {t('reset-password-cta')}
      </Button>
    </form>
  );
};
