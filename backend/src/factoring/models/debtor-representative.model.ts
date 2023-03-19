import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DebtorModel, OrderModel } from 'src/factoring/models';

@ObjectType()
export class DebtorRepresentativeModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => ID, { nullable: false })
  debtorId: string;

  @Field(() => DebtorModel, { nullable: false })
  debtor: DebtorModel;

  @Field(() => OrderModel,  { nullable: true })
  order: OrderModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
