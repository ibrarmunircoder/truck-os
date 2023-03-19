import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Paper } from '@mui/material';
import { useAuth } from 'modules/auth/hooks';
import { LoadingSkeleton, RoqLink, Table, TableColumnInterface } from 'modules/common/components';
import { FormattedDate } from 'modules/date-time/components';
import { EmptyPage } from 'modules/example/components/empty-page/empty-page.component';
import { TitleHeader } from 'modules/example/components/title-header';
import { AuthorInterface } from 'modules/example/interfaces';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import routes from 'routes';
import { useAuthorsTable } from 'views/authors/hooks';
import { useAuthorsTableStyles } from 'views/authors/partials/authors-table/authors-table.styles';

export const AuthorsTablePartial: React.FC = () => {
  const classes = useAuthorsTableStyles();
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const {
    isLoading,
    order,
    authors,
    pageNumber,
    totalCount,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleOrderChange,
  } = useAuthorsTable();

  const columns: TableColumnInterface<AuthorInterface>[] = useMemo(
    () => [
      {
        title: t('author.id'),
        field: 'id',
        render: (rowData: AuthorInterface) => rowData.id.substring(0, 6),
      },
      {
        title: t('author.name'),
        field: 'name',
      },
      {
        title: t('author.surname'),
        field: 'surname',
      },
      {
        title: t('author.age'),
        field: 'age',
      },
      {
        title: t('author.birthDate'),
        field: 'birthDate',
        render: ({ birthDate }: AuthorInterface) =>
          birthDate ? <FormattedDate date={birthDate} timezone={authUser.timezone} format="P" /> : '',
      },
      {
        title: t('author.email'),
        field: 'email',
        cellStyle: { wordBreak: 'break-all' },
      },
      {
        title: t('author.address'),
        field: 'address',
        longText: true,
        render: ({ address }: AuthorInterface) =>
          `${address.houseNumber || ''} ${address.street || ''} ${address.city || ''} ${address.country || ''} ${
            address.zipCode || ''
          }`,
      },
      {
        title: t('author.gender'),
        field: 'gender',
        render: ({ gender }: AuthorInterface) => gender.substring(0, 1) + gender.substring(1).toLowerCase(),
      },
      {
        title: t('author.actions'),
        sorting: false,
        cellStyle: { width: '1%', whiteSpace: 'nowrap' },
        render: (rowData: AuthorInterface) => (
          <Grid container wrap="nowrap">
            <RoqLink href={{ route: routes.exampleEditAuthor, query: { id: rowData.id } }}>
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

  const shouldHidePagination = useMemo(() => authors.length === 0 && pageNumber === 0, [authors, pageNumber]);
  const tableData = useMemo(() => authors.map((row) => ({ ...row })), [authors]);

  return (
    <Paper classes={classes.paper}>
      <TitleHeader page="Author" />
      {isLoading ? (
        <LoadingSkeleton />
      ) : authors.length ? (
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
        <EmptyPage title={t('author.title-plural')} />
      )}
    </Paper>
  );
};
