import {
  QueryInterface,
} from 'src/library/interfaces';
import {
  DebtorRelationContactsInterface
} from 'src/factoring/providers/interfaces';

export interface DebtorRelationInterface extends QueryInterface {
  customerReference?: string;
  applicableLaw?: string;
  paymentTerms?: number;
  contacts?: DebtorRelationContactsInterface[];
}
