import { OrderEnum } from 'src/library/enums';
import {
  DateFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';
import { UserLoginHistoryOrderSortEnum, UserLoginHistorySearchKeyEnum } from 'src/user/enums';

export interface UserLoginHistoryFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: UserLoginHistoryOrderSortEnum;
  };
  search?: {
    value: string;
    key: UserLoginHistorySearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    ip?: StringFilterInterface;
    host?: StringFilterInterface;
    timestamp?: DateFilterInterface;
    userId?: IdFilterInterface;
  };
}
