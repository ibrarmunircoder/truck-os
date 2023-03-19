import { registerEnumType } from '@nestjs/graphql';

export enum DebtorRepresentativeOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE = 'phone',
  EMAIL = 'email',
}

registerEnumType(DebtorRepresentativeOrderSortEnum, {
  name: 'DebtorRepresentativeOrderSortEnum',
});
