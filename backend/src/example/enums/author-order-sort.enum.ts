import { registerEnumType } from '@nestjs/graphql';

export enum AuthorOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  SURNAME = 'surname',
  AGE = 'age',
  BIRTH_DATE = 'birthDate',
  EMAIL = 'email',
  ADDRESS = 'address',
  GENDER = 'gender',
}

registerEnumType(AuthorOrderSortEnum, {
  name: 'AuthorOrderSortEnum',
});
