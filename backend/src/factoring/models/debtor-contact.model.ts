import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DebtorContactModel {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}
