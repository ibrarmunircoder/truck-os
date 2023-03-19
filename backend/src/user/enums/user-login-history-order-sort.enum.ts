import { registerEnumType } from '@nestjs/graphql';

export enum UserLoginHistoryOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  IP = 'ip',
  HOST = 'host',
  TIMESTAMP = 'timestamp',
}

registerEnumType(UserLoginHistoryOrderSortEnum, {
  name: 'UserLoginHistoryOrderSortEnum',
});
