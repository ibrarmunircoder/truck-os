import {
  QueryInterface,
} from 'src/library/interfaces';

export interface DebtorListInterface extends QueryInterface {
  referenceId: string;
  status: string;
  name: string;
  registrationNumber: string;
  registrationAuthorityCode: string;
  legalForm: string;
  addressPostCode: string;
  addressCity: string;
  addressStreet: string;
  country: string;
  applicableLaw: string;
  paymentTerms: number;
}
