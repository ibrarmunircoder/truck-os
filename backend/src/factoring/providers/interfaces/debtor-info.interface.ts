import {
  QueryInterface,
} from 'src/library/interfaces';
import {
  DebtorInterface
} from 'src/factoring/providers/interfaces';

export interface DebtorInfoInterface extends QueryInterface {
  referenceId?: string;
  status?: string;
  data?: DebtorInterface;
}
