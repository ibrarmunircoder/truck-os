import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { classes as joinClasses } from 'modules/common/utils';
import React, { FunctionComponent } from 'react';
import { useAccountActionsStyles } from 'views/account-settings/partials/account-actions/account-actions.styles';

interface AccountActionsPropsInterface {
  icon: string;
  iconAlt: string;
  title: string;
  isGreen?: boolean;
  isChevron?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const AccountActions: FunctionComponent<AccountActionsPropsInterface> = ({
  icon,
  title,
  isGreen = false,
  iconAlt,
  isChevron = false,
  onClick,
}): React.ReactElement => {
  const classes = useAccountActionsStyles();
  return (
    <Box onClick={onClick} className={classes.accountActionsContainer}>
      <img className={classes.accountActionsIcon} src={icon} alt={iconAlt} />
      <Typography
        className={joinClasses(classes.accountActionsTitle, isGreen && classes.accountActionsTitleGreen)}
        component="h3"
      >
        {title}
      </Typography>
      {isChevron && <ArrowForwardIosIcon />}
    </Box>
  );
};
