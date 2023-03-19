import { registerEnumType } from '@nestjs/graphql';

export enum OrderOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  INVOICE_NUMBER = 'invoiceNumber',
  DELIVERY_DATE = 'deliveryDate',
  INVOICE_DATE = 'invoiceDate',
  APPLICABLE_LAW = 'applicableLaw',
  PAYMENT_TERM = 'paymentTerm',
  INVOICE_AMOUNT = 'invoiceAmount'
}

registerEnumType(OrderOrderSortEnum, {
  name: 'OrderOrderSortEnum',
});
