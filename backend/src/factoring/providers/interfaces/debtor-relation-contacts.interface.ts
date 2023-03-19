import {
  QueryInterface,
} from 'src/library/interfaces';

export interface DebtorRelationContactsInterface extends QueryInterface {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
}
