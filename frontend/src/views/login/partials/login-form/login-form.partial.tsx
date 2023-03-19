import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { PasswordField } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { FunctionComponent } from 'react';
import routes from 'routes';
import { useLoginFormSchema } from 'views/login/hooks';
import { useLoginFormStyles } from 'views/login/partials/login-form/login-form.styles';

export interface LoginFormValues {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface LoginFormPartialInterface {
  onSubmit: (formValues: LoginFormValues) => void;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  keepMeLoggedIn: true,
};

export const LoginFormPartial: FunctionComponent<LoginFormPartialInterface> = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const classes = useLoginFormStyles();

  const { handleSubmit, handleChange, values, visibleErrors, setFieldValue, handleBlur, isSubmitting, status } =
    useEnhancedFormik({
      initialValues,
      onSubmit,
      validationSchema: useLoginFormSchema(),
    });

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="email"
        name="email"
        type="email"
        label={t('input.email.placeholder')}
        value={values.email}
        helperText={<span data-cy="email-helper-text">{visibleErrors.email}</span>}
        error={Boolean(visibleErrors.email)}
        autoFocus={true}
        fullWidth
        inputProps={{
          autoComplete: 'username',
        }}
        onChange={handleChange}
        onReset={() => setFieldValue('email', '')}
        onBlur={handleBlur}
        variant="standard"
      />
      <PasswordField
        id="password"
        name="password"
        label={t('input.password.placeholder')}
        value={values.password}
        helperText={<span data-cy="password-helper-text">{visibleErrors.password}</span>}
        error={Boolean(visibleErrors.password)}
        fullWidth
        inputProps={{
          autoComplete: 'current-password',
        }}
        onChange={handleChange}
        onReset={() => setFieldValue('password', '')}
        onBlur={handleBlur}
        variant="standard"
      />

      <Grid container direction="row" justifyContent="space-between" alignItems="center" mt={1.5}>
        <Grid item>
          <FormControlLabel
            className={classes.keepMeLoggedInLabel}
            name="keepMeLoggedIn"
            checked={values.keepMeLoggedIn}
            onChange={handleChange}
            onBlur={handleBlur}
            control={<Checkbox className={classes.keepMeLoggedInCheckbox} />}
            label={t('input.keepMeLoggedIn')}
          />
        </Grid>

        <Grid item>
          <Typography component="p">
            <RoqLink
              data-cy="forgot-password-link"
              className={classes.forgotPassword}
              href={{ route: routes.forgotPassword }}
            >
              {t('forgot-password-cta')}
            </RoqLink>
          </Typography>
        </Grid>
      </Grid>

      <Button
        disabled={isSubmitting || status?.success}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mb: 2, mt: 6, height: '48px' }}
      >
        {t('login')}
      </Button>
      <RoqLink data-cy="create-account-cta" className={classes.registerButton} href={{ route: routes.register }}>
        <Button variant="contained" color="secondary" size="large" fullWidth sx={{ mb: 5, mt: 2, height: '48px' }}>
          {t('go-to-registration')}
        </Button>
      </RoqLink>
    </form>
  );
};
