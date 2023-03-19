import {
  QueryInterface,
} from 'src/library/interfaces';

export interface PaymentDetailsInterface extends QueryInterface {
  tag?: string;
  iban?: string;
  bic?: string;
  currency?: string;
  isPaymentTransferAccount?: boolean;
}
