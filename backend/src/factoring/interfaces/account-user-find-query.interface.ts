import { AccountUserOrderSortEnum, AccountUserSearchKeyEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';
import {
  DateFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface AccountUserFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: AccountUserOrderSortEnum;
  };
  search?: {
    value: string;
    key: AccountUserSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    firstName?: StringFilterInterface;
    lastName?: StringFilterInterface;
    email?: StringFilterInterface;
    birthday?: DateFilterInterface;
    nationality?: StringFilterInterface;
    accountUserType?: StringFilterInterface;
    accountId?: IdFilterInterface;
  };
}
