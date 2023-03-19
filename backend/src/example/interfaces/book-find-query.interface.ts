import { BookOrderSortEnum, BookSearchKeyEnum } from 'src/example/enums';
import { OrderEnum } from 'src/library/enums';
import {
  BooleanFilterInterface,
  DateFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface BookFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: BookOrderSortEnum;
  };
  search?: {
    value: string;
    key: BookSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    title?: StringFilterInterface;
    publishingDate?: DateFilterInterface;
    description?: StringFilterInterface;
    published?: BooleanFilterInterface;
    outOfStock?: BooleanFilterInterface;
    authorId?: IdFilterInterface;
  };
}
