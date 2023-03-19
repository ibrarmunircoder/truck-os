import Grid from '@mui/material/Grid';
import { Order } from 'modules/payment-dashboard/interfaces';
import React, { FunctionComponent } from 'react';
import { RecordPartial } from 'views/payment-dashboard/partials';

interface RecordListingPropsInterface {
  orders: Order[];
}

export const RecordListing: FunctionComponent<RecordListingPropsInterface> = ({ orders }): React.ReactElement => {
  const records = orders.map((order) => (
    <Grid key={order.id} item xs={12}>
      <RecordPartial order={order} />
    </Grid>
  ));

  return <Grid container>{records}</Grid>;
};
