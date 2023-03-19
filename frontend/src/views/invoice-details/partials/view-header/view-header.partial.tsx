import { ChevronLeft } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';
import { useViewHeaderStyles } from 'views/invoice-details/partials/view-header/view-header.styles';

interface ViewHeaderPartialPropsInterface {
  order: OrderResponseInterface;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ViewHeaderPartial: FunctionComponent<ViewHeaderPartialPropsInterface> = ({
  order,
  handleBackButton,
}): React.ReactElement => {
  const classes = useViewHeaderStyles();
  return (
    <Box className={classes.viewHeader}>
      <button className={classes.backButton} onClick={handleBackButton}>
        <ChevronLeft />
      </button>
      <Box>
        <Typography className={classes.viewHeaderTitle} component="h1">
          {order.debtor.name}
        </Typography>
        <Typography className={classes.viewHeaderSubTitle} component="span">
          {dayjs(new Date(order.deliveryDate)).format('DD.MM.YYYY')}
        </Typography>
      </Box>
    </Box>
  );
};
