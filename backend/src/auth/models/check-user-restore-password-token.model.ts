import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckUserRestorePasswordTokenModel {
  @Field(() => Boolean)
  isValid: boolean;

  @Field(() => Boolean, { nullable: true })
  isExpired?: boolean;

  @Field(() => String, { nullable: true })
  email?: string;
}
