import { registerEnumType } from '@nestjs/graphql';

export enum OrderSearchKeyEnum {
  INVOICE_NUMBER = 'invoiceNumber',
  PAYMENT_TERM = 'paymentTerm',
  DEBTOR_NAME = 'debtorName',
}

registerEnumType(OrderSearchKeyEnum, {
  name: 'OrderSearchKeyEnum',
});
