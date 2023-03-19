import { AccountOrderSortEnum, AccountSearchKeyEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';
import {
  BooleanFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface AccountFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: AccountOrderSortEnum;
  };
  search?: {
    value: string;
    key: AccountSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    companyName?: StringFilterInterface;
    legalForm?: StringFilterInterface;
    companyRegisterNumber?: StringFilterInterface;
    city?: StringFilterInterface;
    postalCode?: StringFilterInterface;
    streetAndNumber?: StringFilterInterface;
    country?: StringFilterInterface;
    iban?: StringFilterInterface;
    bic?: StringFilterInterface;
    vatId?: StringFilterInterface;
    registrationAuthority?: StringFilterInterface;
    registrationNumber?: StringFilterInterface;
    legalRepresentative?: BooleanFilterInterface;
    solePower?: BooleanFilterInterface;
    accountUserId?: IdFilterInterface;
    orderId?: IdFilterInterface;
    debtorId?: IdFilterInterface;
    userId?: IdFilterInterface;
  };
}
