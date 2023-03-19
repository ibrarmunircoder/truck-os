import {
  QueryInterface,
} from 'src/library/interfaces';
import {
  DebtorAddressInterface,
  DebtorRelationInterface
} from 'src/factoring/providers/interfaces';

export interface DebtorInterface extends QueryInterface {
  name?: string;
  vatNumber?: string;
  registrationAuthorityCode?: string;
  registrationNumber?: string;
  legalForm?: string;
  lei?: string;
  address?: DebtorAddressInterface;
  relation?: DebtorRelationInterface;
}
