import { Button, Grid, Paper, TextField } from '@mui/material';
import { USER_NAME_INPUT_PROPS } from 'modules/auth/constants';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { useUserInviteOperations } from 'modules/user-invites/hooks';
import { UserInviteInterface } from 'modules/user-invites/interfaces';
import { UserStatus } from 'modules/users/components';
import React, { ReactElement, useCallback } from 'react';
import { useUpdateUserInviteStatus } from 'views/users/hooks';
import { useUserInviteEditFormStyles } from 'views/users/partials/user-invite-edit-form/user-invite-edit-form.styles';
import { UserInviteStatusUpdatedLabelPartial } from 'views/users/partials/user-invite-status-updated-label/user-invite-status-updated-label.partial';

interface EditUserInvitePartialInterface {
  userInvite: UserInviteInterface;
}

const confirmationsByOperationName = {};

const inviteStatusUpdatedAlert = ({ name, status, resetState, t }) => (
  <FormAlert
    data-cy={`user-invite-edit-form-${name === 'cancelInvite' ? 'cancel' : 'resend'}-alert`}
    open
    error={status.error}
    message={name === 'cancelInvite' ? t('invitation-updated_canceled') : t('invitation-updated_pending')}
    autoHideDuration={3000}
    onClose={resetState}
  />
);

const alertsByOperationName = {
  cancelInvite: inviteStatusUpdatedAlert,
  resendInvite: inviteStatusUpdatedAlert,
};

export const UserInviteEditFormPartial = (props: EditUserInvitePartialInterface): ReactElement => {
  const { userInvite } = props;
  const classes = useUserInviteEditFormStyles();
  const { t } = useTranslation();

  const canResend = userInvite.status !== UserInviteStatusEnum.ACCEPTED;
  const canCancel = userInvite.status === UserInviteStatusEnum.PENDING;

  const { updateUserInviteStatus } = useUpdateUserInviteStatus();

  const handleSuccess = useCallback(async (result, operationName) => {
    if (operationName === 'cancelInvite' || operationName === 'resendInvite') {
      await updateUserInviteStatus(result?.id, result?.status);
    }
  }, []);

  const { cancelInvite, resendInvite, currentOperation, onConfirm, onCancel, resetState } = useUserInviteOperations({
    id: userInvite.id,
    onSuccess: handleSuccess,
  });

  const handleReset = () => {
    if (currentOperation.isLoading) {
      return;
    }

    resetState();
  };

  const disableActions = currentOperation?.isLoading;

  return (
    <Paper classes={classes.paper}>
      <form>
        <Grid container className={classes.status} columnGap={1}>
          <Grid item>
            <UserInviteStatusUpdatedLabelPartial
              status={userInvite.status}
              validTill={userInvite?.userToken?.validTill}
              statusUpdatedAt={userInvite.statusUpdatedAt}
            />
          </Grid>
          <Grid item>
            <UserStatus status={userInvite.status} />
          </Grid>
        </Grid>

        <Grid container rowSpacing={2} columnSpacing={3} className={classes.formSection}>
          <Grid item sm={12} md={6}>
            <TextField
              classes={classes.textField}
              type="text"
              label={t('input.first-name.name')}
              variant="standard"
              name="firstName"
              value={userInvite.firstName}
              fullWidth
              disabled
              inputProps={USER_NAME_INPUT_PROPS}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              classes={classes.textField}
              type="text"
              label={t('input.last-name.name')}
              variant="standard"
              name="lastName"
              value={userInvite.lastName}
              fullWidth
              disabled
              inputProps={USER_NAME_INPUT_PROPS}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              classes={classes.textField}
              type="text"
              label={t('input.email.name')}
              variant="standard"
              name="email"
              value={userInvite.email}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>

        <Grid container className={classes.invitationCancelSection} gap={1}>
          <Grid item>
            {canCancel && (
              <Button
                data-cy="user-invite-edit-form-cancel-invite-btn"
                variant="outlined"
                type="button"
                color="error"
                size="large"
                onClick={cancelInvite}
                disabled={disableActions}
              >
                {t('invitation-cancel')}
              </Button>
            )}
          </Grid>

          <Grid item>
            {canResend && (
              <Button
                data-cy="user-invite-edit-form-resend-invite-btn"
                variant="contained"
                type="button"
                size="large"
                onClick={resendInvite}
                disabled={disableActions}
              >
                {t('invitation-resend')}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      {!!currentOperation?.status
        ? alertsByOperationName[currentOperation.name]?.({ ...currentOperation, resetState: handleReset, t })
        : !!currentOperation?.confirmable &&
          confirmationsByOperationName[currentOperation.name]?.({ onConfirm, onCancel, ...currentOperation })}
    </Paper>
  );
};
