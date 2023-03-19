import { Field, ObjectType } from '@nestjs/graphql';
import { PaymentProcessorDebtorAddressModel, PaymentProcessorDebtorRelationModel } from 'src/factoring/models';

@ObjectType()
export class PaymentProcessorDebtorModel {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  registrationAuthorityCode?: string;

  @Field({ nullable: true })
  registrationNumber?: string;

  @Field({ nullable: true })
  vatNumber?: string;

  @Field({ nullable: true })
  legalForm?: string;

  @Field({ nullable: true })
  lei?: string;

  @Field(() => PaymentProcessorDebtorAddressModel, { nullable: true })
  address?: PaymentProcessorDebtorAddressModel;

  @Field(() => PaymentProcessorDebtorRelationModel, { nullable: true })
  relation?: PaymentProcessorDebtorRelationModel;
}
