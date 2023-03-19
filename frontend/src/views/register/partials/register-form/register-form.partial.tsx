import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { PasswordValidationErrors } from 'modules/auth/components';
import { USER_NAME_INPUT_PROPS } from 'modules/auth/constants';
import { useTranslation } from 'modules/common/hooks';
import { PasswordField } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import React, { FunctionComponent } from 'react';
import { useRegisterFormSchema } from 'views/register/hooks';
import { useRegisterFormStyles } from 'views/register/partials/register-form/register-form.styles';

interface RegisterFormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterFormInterface {
  onSubmit: (formValues: RegisterFormValuesInterface) => void;
}

const initialValues: RegisterFormValuesInterface = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const RegisterFormPartial: FunctionComponent<RegisterFormInterface> = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const classes = useRegisterFormStyles();

  const { handleSubmit, handleChange, values, visibleErrors, setFieldValue, handleBlur, isSubmitting } =
    useEnhancedFormik({
      initialValues,
      onSubmit,
      validationSchema: useRegisterFormSchema(),
    });

  return (
    <form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
      <TextField
        name="firstName"
        label={t('input.first-name.placeholder')}
        value={values.firstName}
        helperText={visibleErrors.firstName}
        error={Boolean(visibleErrors.firstName)}
        fullWidth
        autoFocus={true}
        inputProps={USER_NAME_INPUT_PROPS}
        onChange={handleChange('firstName')}
        onReset={() => setFieldValue('firstName', '')}
        onBlur={handleBlur}
        variant="standard"
      />
      <TextField
        name="lastName"
        label={t('input.last-name.placeholder')}
        value={values.lastName}
        helperText={visibleErrors.lastName}
        error={Boolean(visibleErrors.lastName)}
        fullWidth
        inputProps={USER_NAME_INPUT_PROPS}
        onChange={handleChange('lastName')}
        onReset={() => setFieldValue('lastName', '')}
        onBlur={handleBlur}
        variant="standard"
      />
      <TextField
        name="email"
        label={t('input.email.placeholder')}
        value={values.email}
        helperText={visibleErrors.email}
        error={Boolean(visibleErrors.email)}
        fullWidth
        inputProps={{
          autoComplete: 'username',
        }}
        onChange={handleChange('email')}
        onReset={() => setFieldValue('email', '')}
        onBlur={handleBlur}
        variant="standard"
      />
      {/*
        Do not remove hidden field, please.
        It let modern browser to not show password suggestion menu for password field in this case.
      */}
      <input
        id="hidden-password"
        type="password"
        autoComplete="new-password"
        style={{
          display: 'none',
        }}
      />
      <PasswordField
        name="password"
        label={t('input.password.placeholder')}
        value={values.password}
        error={Boolean(visibleErrors.password)}
        fullWidth
        inputProps={{
          autoComplete: 'new-password',
        }}
        onChange={handleChange('password')}
        onReset={() => setFieldValue('password', '')}
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
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mb: 5, mt: 6, height: '48px' }}
      >
        {t('create-account-cta')}
      </Button>
    </form>
  );
};
