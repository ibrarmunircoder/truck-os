import {
  QueryInterface,
} from 'src/library/interfaces';

export interface DebtorAddressInterface extends QueryInterface {
  street?: string;
  addressAddon?: string;
  city?: string;
  postCode?: string;
  country?: string;
}
