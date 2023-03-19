import { DebtorRepresentativeOrderSortEnum, DebtorRepresentativeSearchKeyEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';
import { IdFilterInterface, QueryFilterInterface, QueryInterface, StringFilterInterface } from 'src/library/interfaces';

export interface DebtorRepresentativeFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: DebtorRepresentativeOrderSortEnum;
  };
  search?: {
    value: string;
    key: DebtorRepresentativeSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    name?: StringFilterInterface;
    firstName?: StringFilterInterface;
    lastName?: StringFilterInterface;
    phone?: StringFilterInterface;
    email?: StringFilterInterface;
    debtorId?: IdFilterInterface;
  };
}
