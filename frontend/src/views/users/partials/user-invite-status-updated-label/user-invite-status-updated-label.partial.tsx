import { Typography } from '@mui/material';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { FormattedDate } from 'modules/date-time/components';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import React, { FunctionComponent } from 'react';
import { useUserInviteStatusUpdatedLabelStyles } from 'views/users/partials/user-invite-status-updated-label/user-invite-status-updated-label.styles';

export interface UserInviteStatusUpdatedLabelPartialInterface {
  status: UserInviteStatusEnum;
  statusUpdatedAt?: Date;
  validTill: Date;
}

export const UserInviteStatusUpdatedLabelPartial: FunctionComponent<UserInviteStatusUpdatedLabelPartialInterface> = (
  props,
) => {
  const { status, statusUpdatedAt, validTill } = props;
  const { t } = useTranslation();
  const classes = useUserInviteStatusUpdatedLabelStyles();
  const { user } = useAuth();

  const statusDate = status === UserInviteStatusEnum.PENDING ? validTill : statusUpdatedAt;
  const statusKey = status.toLowerCase();

  /*
    t('invitation-status-description_pending')
    t('invitation-status-description_accepted')
    t('invitation-status-description_expired')
    t('invitation-status-description_canceled')
  */

  return (
    <Typography variant="body2" className={classes.label}>
      {t('invitation-status-description', { context: statusKey })}{' '}
      <FormattedDate date={statusDate} timezone={user.timezone} />
    </Typography>
  );
};
