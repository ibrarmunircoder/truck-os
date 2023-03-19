import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentProcessorDebtorAddressModel {
  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  addressAddon?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  postCode?: string;

  @Field({ nullable: true })
  country?: string;
}
