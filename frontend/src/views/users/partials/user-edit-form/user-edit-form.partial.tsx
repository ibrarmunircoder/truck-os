/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { ActionOverlay, ActionOverlayProps } from 'modules/action-overlay/components/action-overlay';
import { ActionOverlayButtons } from 'modules/action-overlay/components/action-overlay-buttons';
import { USER_NAME_INPUT_PROPS } from 'modules/auth/constants';
import { useTranslation } from 'modules/common/hooks';
import { useTimezones } from 'modules/date-time/hooks';
import { FormAlert } from 'modules/forms/components';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { UserStatus } from 'modules/users/components/user-status';
import { UserInterface } from 'modules/users/interfaces';
import { SingleUserChangeActiveStatusActionEnum } from 'modules/users/slices';
import React, { FunctionComponent, ReactElement, useCallback, useMemo } from 'react';
import { useDeleteAccountUser, useEditUserForm, useUserEdit, useUserEditOperations } from 'views/users/hooks';
import { UserAccountBusinessEditForm } from 'views/users/partials';
import { UserChangeActivatedStatusConfirmation } from 'views/users/partials/user-change-activated-status-confirmation/user-change-activated-status-confirmation.partial';
import { useUserEditFormStyles } from 'views/users/partials/user-edit-form/user-edit-form.styles';

const confirmationsByOperationName = {
  activateUser: ({ onCancel, onConfirm, isLoading }) => (
    <UserChangeActivatedStatusConfirmation
      currentOperation={SingleUserChangeActiveStatusActionEnum.ACTIVATE}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  ),
  deactivateUser: ({ onCancel, onConfirm, isLoading }) => (
    <UserChangeActivatedStatusConfirmation
      currentOperation={SingleUserChangeActiveStatusActionEnum.DEACTIVATE}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  ),
};

const userActivatedStatusChangedAlert = ({ status, resetState, t }) => (
  <FormAlert
    data-cy="user-active-status-update-alert"
    open
    error={status.error}
    message={t('user-active-status-updated-successfully')}
    autoHideDuration={3000}
    onClose={resetState}
  />
);

const alertsByOperationName = {
  activateUser: userActivatedStatusChangedAlert,
  deactivateUser: userActivatedStatusChangedAlert,
};

interface UserInviteEditFormActionOverlayInterface extends ActionOverlayProps<null> {
  user: UserInterface;
}

export const UserInviteEditFormActionOverlay: FunctionComponent<UserInviteEditFormActionOverlayInterface> = (props) => {
  const { user, onSuccess } = props;
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    visibleErrors,
    localeOptions,
    onLocaleChange,
    onTimezoneChange,
    isValid,
    dirty,
    isSubmitting,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    updateRequestError,
    handleCloseRequestUpdateError,
    setTouched,
  } = useEditUserForm(user, onSuccess);
  const {
    error,
    handleDeleteAccountUser,
    resetError,
    isUpdated,
    handleCloseAccountUserSuccessfulModal,
    handleDeleteAccountUserSolePowerChange,
  } = useDeleteAccountUser();
  const classes = useUserEditFormStyles();
  const { t } = useTranslation();
  const timezones = useTimezones();

  if (!user) {
    return null;
  }

  const { active, id, fullName, canDeactivate } = useMemo(() => {
    const { firstName, lastName } = user;
    return {
      ...user,
      fullName: `${firstName} ${lastName}`,
      canDeactivate: user.active,
    };
  }, [user]);

  const { activateUser, deactivateUser, currentOperation, onConfirm, onCancel, resetState } = useUserEditOperations({
    userId: id,
  });

  const handleActiveStatusChangePromptClick = useCallback(() => (canDeactivate ? deactivateUser() : activateUser()), [
    active,
  ]);

  // t('user.change-status_deactivate');
  // t('user.change-status_activate');
  // t('user.change-status-message_deactivate');
  // t('user.change-status-message_activate');

  /**
   * Save button is disabled right now as all the fields are in view only form currently
   * and are disabled by default. Once we have ACL to edit the user profile on basis
   * of role/permission assigned we will enable the fields and save button accordingly
   */
  return (
    <Paper classes={classes.paper} elevation={0}>
      <ActionOverlay
        config={{
          title: t('title_edit-user'),
          subTitle: t('subtitle_edit-user'),
        }}
        {...props}
      >
        {updateRequestError && (
          <FormAlert
            error={updateRequestError}
            severity="error"
            onClose={handleCloseRequestUpdateError}
            autoHideDuration={4000}
          />
        )}
        {error && <FormAlert error={error} severity="error" onClose={resetError} autoHideDuration={4000} />}
        {isUpdated && (
          <FormAlert
            message="Account user deleted successfully."
            severity="success"
            onClose={handleCloseAccountUserSuccessfulModal}
            autoHideDuration={3000}
          />
        )}
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          height="100%"
          component="form"
          onSubmit={handleSubmit}
          data-cy="user-edit-action-overlay-form"
        >
          <Grid item flexGrow={2}>
            <Grid container justifyContent="space-between">
              <Box className={classes.titleSection}>
                <Grid container item gap={2}>
                  <UserStatus status={active ? UserInviteStatusEnum.ACTIVE : UserInviteStatusEnum.INACTIVE} />
                </Grid>
              </Box>
            </Grid>

            {!active && (
              <Grid className={classes.deactivatedLabels}>
                {/*
            Hidden according not decided deactivated timestamp usage
            <Box className={classes.deactivatedAtLabel}>
              {t('user.deactivated-time-message')}{' '}
              <FormattedDate date={user.deactivatedAt} timezone={authUser.timezone} />
            </Box> */}
                <Box className={classes.deactivatedUserLabel}>
                  <Typography variant="body1" color="primary">
                    {t('user.deactivated-name-message')}{' '}
                    <span className={classes.deactivatedUserLabelFullName}>
                      {fullName} ({t('user.deactivated')})
                    </span>
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid container rowSpacing={2} columnSpacing={3} className={classes.formSection}>
              {/* <Grid item sm={12} md={6}>
                <TextField
                  classes={classes.textField}
                  type="text"
                  variant="standard"
                  name="email"
                  value={values.email}
                  helperText={visibleErrors.email}
                  error={Boolean(visibleErrors.email)}
                  fullWidth
                  disabled
                />
              </Grid> */}

              {/* <Grid item sm={12} md={6}> */}
              {/* spacer */}
              {/* </Grid> */}

              <Grid item sm={12} md={6}>
                <TextField
                  classes={classes.textField}
                  type="text"
                  label={t('input.first-name.name')}
                  variant="standard"
                  name="firstName"
                  value={values.firstName}
                  helperText={visibleErrors.firstName}
                  error={Boolean(visibleErrors.firstName)}
                  fullWidth
                  inputProps={USER_NAME_INPUT_PROPS}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  classes={classes.textField}
                  type="text"
                  label={t('input.last-name.name')}
                  variant="standard"
                  name="lastName"
                  value={values.lastName}
                  helperText={visibleErrors.lastName}
                  error={Boolean(visibleErrors.lastName)}
                  fullWidth
                  inputProps={USER_NAME_INPUT_PROPS}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <Autocomplete
                  disableClearable
                  options={localeOptions}
                  value={values.locale}
                  onChange={onLocaleChange}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      classes={classes.textField}
                      fullWidth
                      name="locale"
                      label={t('locale')}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Autocomplete
                  disableClearable
                  options={timezones}
                  value={values.timezone}
                  onChange={onTimezoneChange}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      classes={classes.textField}
                      fullWidth
                      name="timezone"
                      label={t('timezone')}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              {values.account && Object.keys(values).length && (
                <UserAccountBusinessEditForm
                  setTouched={setTouched}
                  handleDeleteAccountUser={handleDeleteAccountUser}
                  handleDeleteAccountUserSolePowerChange={handleDeleteAccountUserSolePowerChange}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  values={values}
                  getFieldProps={getFieldProps}
                  touched={touched}
                />
              )}
            </Grid>

            <Grid container className={classes.activationRow}>
              <Box>
                <Button
                  data-cy="user-edit-action-overlay-activate-deactivate-btn"
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={handleActiveStatusChangePromptClick}
                >
                  {t(canDeactivate ? 'user.change-status_deactivate' : 'user.change-status_activate')}
                </Button>
              </Box>
            </Grid>

            {/*
        Hidden according to the optedIn to optedInAt field migration
        <Grid container alignItems="center">
          <Switch
            checked={!values.optedInAt}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setFieldValue('optedIn', !event.target.checked)}
            color="secondary"
            name="optedIn"
            classes={classes.switch}
          />

          <Typography className={classes.deactivateUserLabel}>{t('deactivate-user')}</Typography>
        </Grid> */}

            {!!currentOperation?.status
              ? alertsByOperationName[currentOperation.name]?.({ ...currentOperation, resetState, t })
              : !!currentOperation?.confirmable &&
                confirmationsByOperationName[currentOperation.name]?.({ onConfirm, onCancel, ...currentOperation })}
          </Grid>

          <Grid item flexShrink={1}>
            <ActionOverlayButtons
              submitButton={
                <Button
                  data-cy="user-edit-action-overlay-submit-btn"
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {t('save')}
                </Button>
              }
              cancelButton={
                <Button
                  data-cy="user-edit-action-overlay-cancel-btn"
                  variant="outlined"
                  size="large"
                  type="button"
                  onClick={props.onClose}
                  color="error"
                >
                  {t('cancel')}
                </Button>
              }
              onCancel={props.onClose}
              displaySubmitButton={true}
              isSubmitting={isSubmitting}
            />
          </Grid>
        </Grid>
      </ActionOverlay>
    </Paper>
  );
};

interface EditUserPartialInterface extends ActionOverlayProps<null> {
  userId: string;
}

export const UserEditFormPartial = (props: EditUserPartialInterface): ReactElement => {
  const { userId } = props;
  const { user } = useUserEdit(userId);

  if (!user) {
    return null;
  }

  return <UserInviteEditFormActionOverlay user={user} {...props} />;
};
