import { roqMakeStyles } from 'modules/common/utils';

export interface TableClasses {
  longTextCell: string;
  titleWrapper: string;
}

export const useTableStyles = roqMakeStyles<TableClasses>(() => ({
  longTextCell: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'block',
    width: 'inherit',
  },
  titleWrapper: {
    display: 'inline-flex',
    verticalAlign: 'middle',
  }
}));
