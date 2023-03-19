import { Chip } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { useUserStatusStyles } from 'modules/users/components/user-status/user-status.styles';
import React, { FunctionComponent } from 'react';

export interface UserStatusInterface {
  status?: UserInviteStatusEnum;
}

export const UserStatus: FunctionComponent<UserStatusInterface> = ({ status }) => {
  const classes = useUserStatusStyles();
  const { t } = useTranslation();
  /*
    We have this commented on purpose, for translations
    t('status.active')
    t('status.inactive')
    t('invitation-status_pending');
    t('invitation-status_accepted');
    t('invitation-status_expired');
    t('invitation-status_canceled');
  */
  const translationKeys = {
    active: 'status.active',
    inactive: 'status.inactive',
    pending: 'invitation-status_pending',
    accepted: 'invitation-status_accepted',
    expired: 'invitation-status_expired',
    canceled: 'invitation-status_canceled',
  };

  const normalizedStatus = status.toLocaleLowerCase();
  const label = translationKeys[normalizedStatus];
  const className = [classes.statusChip, classes[`${normalizedStatus}Chip`]].join(' ');
  return (
    <Chip data-cy={`user-status-${normalizedStatus}-chip`} component="span" label={t(label)} className={className} />
  );
};
