import Paper, { PaperProps } from '@mui/material/Paper';
import { useTableContainerStyles } from 'modules/common/components/table-container/table-container.styles';
import React, { ReactElement } from 'react';

export const TableContainer = (props: PaperProps): ReactElement => {
  const classes = useTableContainerStyles(props);

  return (
    <Paper
      {...props}
      classes={classes}
      elevation={0}
    />
  );
}
