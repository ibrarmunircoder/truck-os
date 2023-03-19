import { DebtorStatusEnum } from 'src/factoring/enums';
import { QueryInterface } from 'src/library/interfaces';

export interface DebtorStatusPriceInterface extends QueryInterface {
  debtorStatus: DebtorStatusEnum;
}
