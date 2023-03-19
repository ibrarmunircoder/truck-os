import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useTablePaginationStyles } from 'modules/common/components/table-pagination/table-pagination.styles';
import React, { FunctionComponent, ReactElement } from 'react';

interface Localization {
  firstTooltip?: string;
  previousTooltip?: string;
  nextTooltip?: string;
  lastTooltip?: string;
  labelDisplayedRows?: string;
  labelRowsPerPage?: string;
}

interface TablePaginationProps {
  onPageChange?: (pageSize?: number, newPage?: number) => void;
  page?: number;
  count?: number;
  rowsPerPage?: number;
  classes?: unknown;
  localization?: Localization;
  theme?: unknown;
  showFirstLastPageButtons?: boolean;
}

export const TablePagination: FunctionComponent<TablePaginationProps> = (props): ReactElement => {
  const classes = useTablePaginationStyles();
  const { count, onPageChange, rowsPerPage, page } = props;

  const handleChange = (_, value: number) => {
    const newPage = value - 1;
    onPageChange(rowsPerPage, newPage);
  };

  const pages = Math.ceil(count / rowsPerPage);

  return (
    <Grid container item justifyContent="center" className={classes.root}>
      <Pagination count={pages} page={page + 1} onChange={handleChange} />
    </Grid>
  );
};
