import { AuthorOrderSortEnum, AuthorSearchKeyEnum } from 'src/example/enums';
import { OrderEnum } from 'src/library/enums';
import {
  DateFilterInterface,
  IdFilterInterface,
  IntFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface AuthorFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: AuthorOrderSortEnum;
  };
  search?: {
    value: string;
    key: AuthorSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    name?: StringFilterInterface;
    surname?: StringFilterInterface;
    age?: IntFilterInterface;
    birthDate?: DateFilterInterface;
    email?: StringFilterInterface;
    gender?: StringFilterInterface;
    bookId?: IdFilterInterface;
  };
}
