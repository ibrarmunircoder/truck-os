import { DebtorOrderSortEnum, DebtorSearchKeyEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';
import {
  BooleanFilterInterface,
  IdFilterInterface,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from 'src/library/interfaces';

export interface DebtorFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: DebtorOrderSortEnum;
  };
  search?: {
    value: string;
    key: DebtorSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    name?: StringFilterInterface;
    vatNumber?: StringFilterInterface;
    addressAddon?: StringFilterInterface;
    commercialRegister?: StringFilterInterface;
    commercialRegisterNumber?: StringFilterInterface;
    legalForm?: StringFilterInterface;
    validated?: BooleanFilterInterface;
    debtorReferenceId?: StringFilterInterface;
    city?: StringFilterInterface;
    postalCode?: StringFilterInterface;
    streetAndNumber?: StringFilterInterface;
    country?: StringFilterInterface;
    accountId?: IdFilterInterface;
    orderId?: IdFilterInterface;
    debtorRepresentativeId?: IdFilterInterface;
  };
}
