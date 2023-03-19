import { registerEnumType } from '@nestjs/graphql';
export enum OrderFileUploadTypeEnum {
  ORDER_FILE_INVOICE_CATEGORY = 'INVOICE',
  ORDER_FILE_POD_CATEGORY = 'PROOF_OF_DELIVERY',
}
registerEnumType(OrderFileUploadTypeEnum, {
  name: 'OrderFileUploadTypeEnum',
});
