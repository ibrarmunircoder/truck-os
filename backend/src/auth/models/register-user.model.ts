import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterUserModel {
  @Field()
  status: boolean;

  @Field()
  message: string;
}
