import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import { useUserTableToggleButtonGroupStyles } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.styles';
import React, { FunctionComponent } from 'react';

export enum UserTableToggleButtonGroupEnum {
  ACTIVE = 'users-active',
  INACTIVE = 'users-inactive',
  INVITED = 'users-invited',
  CANCELED = 'users-canceled',
}

interface UserTableToggleButtonGroupInterface {
  userFilter: UserTableToggleButtonGroupEnum;
  onChange: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: unknown) => void;
}

export const UserTableToggleButtonGroup: FunctionComponent<UserTableToggleButtonGroupInterface> = (props) => {
  const { userFilter, onChange } = props;
  const { t } = useTranslation();
  const classes = useUserTableToggleButtonGroupStyles();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <ToggleButtonGroup
        value={userFilter}
        exclusive
        onChange={onChange}
        aria-label="Filter toggle"
        className={classes.filterToggleButtonGroup}
        size="small"
      >
        <ToggleButton value={UserTableToggleButtonGroupEnum.ACTIVE}>{t('active')}</ToggleButton>
        <ToggleButton value={UserTableToggleButtonGroupEnum.INACTIVE}>{t('inactive')}</ToggleButton>
        <ToggleButton value={UserTableToggleButtonGroupEnum.INVITED}>{t('invited')}</ToggleButton>
        <ToggleButton value={UserTableToggleButtonGroupEnum.CANCELED}>{t('invitation-status_canceled')}</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
