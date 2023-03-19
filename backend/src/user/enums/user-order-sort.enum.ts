import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderSortEnum {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  email = 'email',
  phone = 'phone',
  firstName = 'firstName',
  lastName = 'lastName',
  locale = 'locale',
  timezone = 'timezone',
  optedInAt = 'optedInAt',
  active = 'active',
}

registerEnumType(UserOrderSortEnum, {
  name: 'UserOrderSortEnum',
});
