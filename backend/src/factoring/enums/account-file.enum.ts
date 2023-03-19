import { registerEnumType } from '@nestjs/graphql';
export enum AccountFileEnum {
  TRADE_REGISTRATION = 'TRADE_REGISTRATION',
}
registerEnumType(AccountFileEnum, {
  name: 'AccountFileEnum',
});
