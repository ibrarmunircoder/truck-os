import { registerEnumType } from '@nestjs/graphql';

export enum AccountUserSearchKeyEnum {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  NATIONALITY = 'nationality',
}

registerEnumType(AccountUserSearchKeyEnum, {
  name: 'AccountUserSearchKeyEnum',
});
