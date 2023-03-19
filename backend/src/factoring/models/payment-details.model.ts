import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentDetailsModel {
  @Field({ nullable: true })
  tag?: string;

  @Field({ nullable: true })
  iban?: string;

  @Field({ nullable: true })
  bic?: string;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  isPaymentTransferAccount?: boolean;
}
