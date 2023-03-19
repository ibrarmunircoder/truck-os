import { Field, ObjectType } from '@nestjs/graphql';
import { PaymentProcessorDebtorRelationContactModel } from 'src/factoring/models';

@ObjectType()
export class PaymentProcessorDebtorRelationModel {
  @Field({ nullable: true })
  customerReference?: string;

  @Field({ nullable: true })
  applicableLaw?: string;

  @Field({ nullable: true })
  paymentTerms?: number;

  @Field(() => [PaymentProcessorDebtorRelationContactModel], { nullable: true })
  contacts?: PaymentProcessorDebtorRelationContactModel[];
}
