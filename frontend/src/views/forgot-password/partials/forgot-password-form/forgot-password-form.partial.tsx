import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'modules/common/hooks';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { FunctionComponent } from 'react';
import { useForgotPasswordFormSchema } from 'views/forgot-password/hooks';

export interface ForgotPasswordFormValuesInterface {
  email: string | string[];
}

export interface ForgotPasswordFormPartialInterface {
  onSubmit: (formValues: ForgotPasswordFormValuesInterface) => void;
}

const initialValues: ForgotPasswordFormValuesInterface = {
  email: '',
};

export const ForgotPasswordFormPartial: FunctionComponent<ForgotPasswordFormPartialInterface> = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();

  const { handleSubmit, handleChange, values, visibleErrors, setFieldValue, handleBlur } = useEnhancedFormik({
    initialValues,
    onSubmit,
    validationSchema: useForgotPasswordFormSchema(),
    enableReinitialize: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        type="email"
        label={t('input.email.name')}
        value={values.email}
        helperText={visibleErrors.email}
        error={Boolean(visibleErrors.email)}
        fullWidth
        onChange={handleChange}
        onReset={() => setFieldValue('email', '')}
        onBlur={handleBlur}
        variant="standard"
      />
      <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 3.5 }}>
        {t('send-instructions')}
      </Button>
    </form>
  );
};
