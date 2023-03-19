import { Field, ObjectType } from '@nestjs/graphql';
import { PaymentProcessorDebtorModel } from 'src/factoring/models';

@ObjectType()
export class PaymentProcessorDebtorDataModel {
  @Field({ nullable: true })
  referenceId?: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => PaymentProcessorDebtorModel, { nullable: true })
  data?: PaymentProcessorDebtorModel;
}
