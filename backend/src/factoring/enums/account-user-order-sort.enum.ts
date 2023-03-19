import { registerEnumType } from '@nestjs/graphql';

export enum AccountUserOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  BIRTHDAY = 'birthday',
  NATIONALITY = 'nationality',
  ACCOUNT_USER_TYPE = 'accountUserType',
}

registerEnumType(AccountUserOrderSortEnum, {
  name: 'AccountUserOrderSortEnum',
});
