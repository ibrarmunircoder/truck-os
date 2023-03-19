import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentProcessorDebtorListModel {
  @Field({ nullable: true })
  referenceId?: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  registrationNumber: string;

  @Field({ nullable: true })
  registrationAuthorityCode: string;

  @Field({ nullable: true })
  legalForm: string;

  @Field({ nullable: true })
  addressPostCode: string;

  @Field({ nullable: true })
  addressCity: string;

  @Field({ nullable: true })
  addressStreet: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  applicableLaw: string;

  @Field(() => Int, { nullable: true })
  paymentTerms: number;
}
