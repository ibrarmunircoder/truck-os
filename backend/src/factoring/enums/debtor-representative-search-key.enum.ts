import { registerEnumType } from '@nestjs/graphql';

export enum DebtorRepresentativeSearchKeyEnum {
  NAME = 'name',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE = 'phone',
  EMAIL = 'email',
}

registerEnumType(DebtorRepresentativeSearchKeyEnum, {
  name: 'DebtorRepresentativeSearchKeyEnum',
});
