import { OrderOrderSortEnum, OrderSearchKeyEnum } from 'src/factoring/enums';
import { NumberFilterArgType } from 'src/library/argTypes';
import { OrderEnum } from 'src/library/enums';
import {
  DateFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface OrderFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: OrderOrderSortEnum;
  };
  search?: {
    value: string;
    key: OrderSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    invoiceNumber?: StringFilterInterface;
    deliveryDate?: DateFilterInterface;
    invoiceDate?: DateFilterInterface;
    applicableLaw?: StringFilterInterface;
    paymentTerm?: StringFilterInterface;
    invoiceAmount?: NumberFilterArgType;
    accountId?: IdFilterInterface;
    debtorId?: IdFilterInterface;
    receivableReferenceId?: StringFilterInterface;
    status?: StringFilterInterface;
  };
}
