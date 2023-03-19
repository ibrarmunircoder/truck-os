import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { AuthUserInterface } from 'modules/auth';
import { ValidatedPasswordField } from 'modules/auth/components/validated-password-field';
import { ChangePasswordHandlerType, useSsoProviders } from 'modules/auth/hooks';
import { useEditMode, useTranslation } from 'modules/common/hooks';
import { FormAlert, PasswordField } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import React, { ReactElement } from 'react';
import { useMeasure } from 'react-use';
import { usePasswordChangeForm } from 'views/settings/hooks';
import { usePasswordChangeFormSchema } from 'views/settings/hooks/use-password-change-form-schema.hook';
import {
  PasswordChangeFormClasses,
  usePasswordChangeFormStyles,
} from 'views/settings/partials/password-change-form/password-change-form.styles';
import { SsoAuthPartial } from 'views/settings/partials/sso-auth/sso-auth.partial';

type PasswordChangeFormPartialProps = {
  classes?: PasswordChangeFormClasses;
  user: AuthUserInterface;
  providerId?: string | null;
  onPasswordChange?: ChangePasswordHandlerType;
  onDisconnectProvider: (providerId: string) => void;
};

export const PasswordChangeFormPartial = (props: PasswordChangeFormPartialProps): ReactElement => {
  const { t } = useTranslation();
  const [ref, { width }] = useMeasure();
  const { editMode, switchToEditMode, switchToViewMode } = useEditMode();
  const classes = usePasswordChangeFormStyles({ ...props, width });
  const { providersById } = useSsoProviders();

  const { user, providerId, onDisconnectProvider, onPasswordChange } = props;
  const { onSubmit, initialValues } = usePasswordChangeForm(onPasswordChange);

  const {
    handleSubmit,
    handleChange,
    values,
    status,
    resetStatus,
    visibleErrors,
    setFieldValue,
    handleBlur,
    resetForm,
    isValid,
    isSubmitting,
  } = useEnhancedFormik({
    initialValues,
    onSubmit,
    onSubmitSuccess: switchToViewMode,
    validationSchema: usePasswordChangeFormSchema(),
  });

  const handleCancel = () => {
    resetForm();
    switchToViewMode();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card classes={classes.card} raised>
        <CardHeader
          classes={classes.cardHeader}
          title={<Typography variant="h4">{t('password-section-title')}</Typography>}
          action={
            !providerId &&
            (editMode ? (
              <div className={classes.buttonWrapper}>
                <Button variant="outlined" classes={classes.cancelButton} onClick={handleCancel}>
                  {t('cancel')}
                </Button>
                <Button
                  disabled={!isValid || isSubmitting}
                  variant="contained"
                  classes={classes.saveButton}
                  type="submit"
                  key="submit"
                >
                  {t('save')}
                </Button>
              </div>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                classes={classes.editButton}
                onClick={switchToEditMode}
                key="edit"
              >
                {t('edit')}
              </Button>
            ))
          }
        />
        <CardContent classes={classes.cardContent}>
          {providerId ? (
            !editMode && (
              <>
                {user.connectedProviderIds.length > 0 &&
                  (user.connectedProviderIds.length === 1 ? (
                    <Typography variant="h5" className={classes.title}>
                      {t('sso-connected-text', { name: providersById[user.connectedProviderIds[0]].name })}
                    </Typography>
                  ) : (
                    <Typography variant="h5" className={classes.title}>
                      {t('sso-connected-multiple-text')}
                    </Typography>
                  ))}
                {user.connectedProviderIds.map((id) => (
                  <SsoAuthPartial onDisconnect={onDisconnectProvider} providerId={id} key={id} />
                ))}
              </>
            )
          ) : (
            <>
              <Grid
                className={clsx(classes.cardContent, classes.gridContainer)}
                container
                rowSpacing={2}
                columnSpacing={3}
              >
                <Grid item xs={12} sm={12} md={6} classes={classes.gridItem}>
                  <PasswordField
                    variant="outlined"
                    name="password"
                    label={editMode ? t('input.current-password.placeholder') : t('input.password.placeholder')}
                    value={editMode ? values.password : '********'}
                    disabled={!editMode}
                    fullWidth
                    inputProps={{
                      autoComplete: 'current-password',
                    }}
                    onChange={handleChange('password')}
                  />
                </Grid>
              </Grid>
              {editMode && (
                <Grid
                  container
                  className={clsx(classes.cardContent, classes.gridContainer)}
                  rowSpacing={2}
                  columnSpacing={3}
                >
                  <Grid item xs={12} sm={12} md={6}>
                    <ValidatedPasswordField
                      variant="outlined"
                      name="newPassword"
                      label={t('input.new-password.placeholder')}
                      value={values.newPassword}
                      helperText={visibleErrors.newPassword}
                      error={Boolean(visibleErrors.newPassword)}
                      fullWidth
                      ref={ref}
                      inputProps={{
                        autoComplete: 'new-password',
                      }}
                      onChange={handleChange('newPassword')}
                      onReset={() => setFieldValue('newPassword', '')}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <PasswordField
                      variant="outlined"
                      name="repeatNewPassword"
                      label={t('input.confirm-new-password.placeholder')}
                      value={values.repeatNewPassword}
                      helperText={visibleErrors.repeatNewPassword}
                      error={Boolean(visibleErrors.repeatNewPassword)}
                      fullWidth
                      inputProps={{
                        autoComplete: 'new-password',
                      }}
                      onChange={handleChange('repeatNewPassword')}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </CardContent>
      </Card>
      {status && <FormAlert open message={t('change-password-success')} error={status.error} onClose={resetStatus} />}
    </form>
  );
};
