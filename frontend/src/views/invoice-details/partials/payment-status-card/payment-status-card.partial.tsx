import { InfoOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MoneyWhiteIcon from 'modules/common/icons/money-icon-white.svg';
import WalletWhiteIcon from 'modules/common/icons/wallet-white.svg';
import { classes as classList } from 'modules/common/utils/classes';
import React, { FunctionComponent } from 'react';
import { usePaymentStatusCardStyles } from 'views/invoice-details/partials/payment-status-card/payment-status-card.styles';

interface PaymentStatusCardPropsInterface {
  status: string;
  statusDescription: string;
  isMoneyPendingIcon: boolean;
  handleTooltipClose: () => void;
  handleTooltipOpen: () => void;
  open: boolean;
}

export const PaymentStatusCard: FunctionComponent<PaymentStatusCardPropsInterface> = ({
  status,
  statusDescription,
  isMoneyPendingIcon,
  handleTooltipClose,
  handleTooltipOpen,
  open,
}): React.ReactElement => {
  const classes = usePaymentStatusCardStyles();
  const icon = isMoneyPendingIcon ? <MoneyWhiteIcon /> : <WalletWhiteIcon />;
  return (
    <Box className={classes.paymentStatusCard}>
      <Box
        className={classList(classes.iconSquare, isMoneyPendingIcon ? classes.greyBgGradient : classes.greenBgGradient)}
      >
        {icon}
      </Box>
      <Typography className={classes.paymentStatusCardTitle} component="h2">
        {status}
      </Typography>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          enterTouchDelay={0}
          classes={{
            tooltip: classes.tooltip,
          }}
          onClose={handleTooltipClose}
          onMouseOver={handleTooltipOpen}
          open={open}
          disableFocusListener
          disableTouchListener
          title={statusDescription}
        >
          <InfoOutlined className={classes.infoIcon} onClick={handleTooltipOpen} />
        </Tooltip>
      </ClickAwayListener>
    </Box>
  );
};
