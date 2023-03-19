import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentProcessorDebtorRelationContactModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}
