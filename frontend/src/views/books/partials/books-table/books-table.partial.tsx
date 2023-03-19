import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Paper } from '@mui/material';
import { useAuth } from 'modules/auth/hooks';
import { LoadingSkeleton, RoqLink, Table, TableColumnInterface } from 'modules/common/components';
import { FormattedDate } from 'modules/date-time/components';
import { EmptyPage } from 'modules/example/components/empty-page/empty-page.component';
import { TitleHeader } from 'modules/example/components/title-header';
import { BookInterface } from 'modules/example/interfaces';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import routes from 'routes';
import { useBooksTable } from 'views/books/hooks';
import { useBooksTableStyles } from 'views/books/partials/books-table/books-table.styles';

export const BooksTablePartial: React.FC = () => {
  const classes = useBooksTableStyles();
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const {
    isLoading,
    order,
    books,
    pageNumber,
    totalCount,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleOrderChange,
  } = useBooksTable();

  const columns: TableColumnInterface<BookInterface>[] = useMemo(
    () => [
      {
        title: t('book.id'),
        field: 'id',
        render: (rowData: BookInterface) => rowData.id.substring(0, 6),
      },
      {
        title: t('book.title'),
        field: 'title',
        longText: true,
      },
      {
        title: t('book.description'),
        field: 'description',
        longText: true,
      },
      {
        title: t('book.price'),
        field: 'price',
      },
      {
        title: t('book.author'),
        field: 'author',
        render: (rowData: BookInterface) => `${rowData.author.name || ''} ${rowData.author.surname || ''}`,
      },
      {
        title: t('book.publishingDate'),
        field: 'publishingDate',
        render: ({ publishingDate }: BookInterface) =>
          publishingDate ? <FormattedDate date={publishingDate} timezone={authUser.timezone} format="P" /> : '',
      },
      {
        title: t('book.published'),
        field: 'published',
        render: (rowData: BookInterface) => (rowData.published ? 'Yes' : 'No'),
      },
      {
        title: t('book.outOfStock'),
        field: 'outOfStock',
        render: (rowData: BookInterface) => (rowData.outOfStock ? 'Yes' : 'No'),
      },
      {
        title: t('book.actions'),
        sorting: false,
        cellStyle: { width: '1%', whiteSpace: 'nowrap' },
        render: (rowData: BookInterface) => (
          <Grid container wrap="nowrap">
            <RoqLink href={{ route: routes.exampleEditBook, query: { id: rowData.id } }}>
              <IconButton className={classes.tableIcon}>
                <EditIcon />
              </IconButton>
            </RoqLink>
          </Grid>
        ),
      },
    ],
    [classes, t],
  );

  const shouldHidePagination = useMemo(() => books.length === 0 && pageNumber === 0, [books, pageNumber]);
  const tableData = useMemo(() => books.map((row) => ({ ...row })), [books]);

  return (
    <Paper classes={classes.paper}>
      <TitleHeader page="Book" />
      {isLoading ? (
        <LoadingSkeleton />
      ) : books.length ? (
        <Table
          page={pageNumber}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePageSizeChange}
          onOrderChange={handleOrderChange}
          order={order}
          totalCount={totalCount}
          columns={columns}
          isLoading={isLoading}
          data={tableData}
          options={{
            paging: !shouldHidePagination,
            paginationType: 'stepped',
            pageSize,
            pageSizeOptions: [5, 10, 20],
            showTitle: false,
            search: false,
            sorting: true,
            toolbar: false,
            draggable: false,
          }}
        />
      ) : (
        <EmptyPage title={t('book.title-plural')} />
      )}
    </Paper>
  );
};
