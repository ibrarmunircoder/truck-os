import snakeCase from 'lodash/snakeCase';
import { Column, MaterialTableProps, MTable } from 'material-table';
import { NoDataComponent } from 'modules/common/components/no-data';
import { TableClasses, useTableStyles } from 'modules/common/components/table/table.styles';
import { TableContainer } from 'modules/common/components/table-container';
import { TablePagination } from 'modules/common/components/table-pagination';
import { OrderEnum } from 'modules/common/enums';
import { useTranslation } from 'modules/common/hooks';
import dynamic from 'next/dynamic';
import React, { ReactElement, useCallback, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MaterialTable = dynamic(import('material-table')) as any;

type SortOrder = 'asc' | 'desc';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface TableColumnInterface<RowData extends object> extends Column<RowData> {
  longText?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface TableInterface<RowData extends object, SortEnum>
  extends Omit<MaterialTableProps<RowData>, 'onOrderChange'> {
  classes?: TableClasses;
  columns: TableColumnInterface<RowData>[];
  onOrderChange: (sort: SortEnum, order: OrderEnum) => void;
  order: { order: OrderEnum; sort: SortEnum };
  fieldSortMap?: Partial<Record<keyof RowData, SortEnum>>;
  noDataText?: string
}

const defaultComponents = {
  Container: TableContainer,
  Pagination: TablePagination,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const Table = <RowData extends object, SortEnum>({
  classes: passedClasses,
  columns: tableColumns,
  components,
  fieldSortMap,
  order,
  onOrderChange,
  ...props
}: TableInterface<RowData, SortEnum>): ReactElement => {
  const classes = useTableStyles({ classes: passedClasses, props });
  const { t } = useTranslation();

  const getFieldSortName = useCallback(
    (field: Column<RowData>['field']) => {
      if (fieldSortMap) return fieldSortMap[field as string];
      return snakeCase(field as string)?.toUpperCase();
    },
    [fieldSortMap],
  );
  const handleOrderChange = useCallback(
    (orderedColumnId: number, orderDirection: 'DESC' | 'ASC') => {
      if (!tableColumns[orderedColumnId]) return;
      const sortField = getFieldSortName(tableColumns[orderedColumnId].field) as SortEnum;
      if (!sortField) return;
      onOrderChange(sortField, orderDirection === 'DESC' ? OrderEnum.DESC : OrderEnum.ASC);
    },
    [onOrderChange, getFieldSortName, tableColumns],
  );

  const createLongTextRenderer = useCallback(
    (
        renderer: Column<RowData>['render'],
      ): Column<RowData>['render'] => // eslint-disable-next-line react/display-name
      (data, type) => {
        const text = renderer(data, type);

        return (
          <span className={classes.longTextCell} title={text}>
            {text}
          </span>
        );
      },
    [classes],
  );
  const columns = useMemo(
    () =>
      tableColumns.map(({ longText, ...col }) => {
        const defaultSort: SortOrder = order.order === OrderEnum.DESC ? 'desc' : 'asc';
        const columnData = (getFieldSortName(col.field) as SortEnum) === order.sort ? { ...col, defaultSort } : col;
        return {
          ...columnData,
          title: <span className={classes.titleWrapper}>{col.title}</span>,
          render: longText
            ? createLongTextRenderer(col.render ?? ((data) => data[col.field as keyof RowData]))
            : col.render,
        };
      }),
    [tableColumns, classes.titleWrapper],
  );

  if (!Boolean(props?.totalCount)) {
    return < NoDataComponent text={props?.noDataText} />
  }

  return (
    <MaterialTable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components={{ ...(MTable as any).defaultProps.components, ...defaultComponents, ...components }}
      localization={{
        header: {
          actions: t('action'),
        },
        pagination: {
          firstTooltip: t('pagination.first'),
          previousTooltip: t('pagination.previous'),
          nextTooltip: t('pagination.next'),
          lastTooltip: t('pagination.last'),
          labelDisplayedRows: t('pagination.displayed-rows-range'),
          labelRowsSelect: t('rows'),
          labelRowsPerPage: t('pagination.rows-per-page'),
        },
      }}
      {...props}
      onOrderChange={handleOrderChange}
      columns={columns}
    />
  );
};
