import { registerEnumType } from '@nestjs/graphql';
export enum AuthorGenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}
registerEnumType(AuthorGenderEnum, {
  name: 'AuthorGenderEnum',
});
