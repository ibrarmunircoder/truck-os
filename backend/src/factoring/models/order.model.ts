import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ReceivableStatusEnum } from 'src/factoring/enums';
import { AccountModel, DebtorModel, DebtorRepresentativeModel, OrderFileModel } from 'src/factoring/models';

@ObjectType()
export class OrderModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  invoiceNumber?: string;

  @Field({ nullable: true })
  deliveryDate?: Date;

  @Field({ nullable: true })
  invoiceDate?: Date;

  @Field({ nullable: true })
  applicableLaw?: string;

  @Field({ nullable: true })
  paymentTerm?: string;

  @Field(() => Float, { nullable: true })
  invoiceAmount?: number;

  @Field(() => Float, { nullable: true })
  receivableAmount?: number;

  @Field(() => ID, { nullable: true })
  accountId: string;

  @Field(() => ID, { nullable: true })
  receivableReferenceId?: string;

  @Field(() => AccountModel, { nullable: true })
  account: AccountModel;

  @Field(() => [OrderFileModel])
  orderFiles: OrderFileModel[];

  @Field(() => ID, { nullable: true })
  debtorId: string;

  @Field(() => DebtorModel, { nullable: true })
  debtor: DebtorModel;

  @Field({ nullable: true })
  draft?: boolean;

  @Field({ nullable: true })
  status?: ReceivableStatusEnum;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  debtorRepresentativeId?: string;

  @Field(() => DebtorRepresentativeModel, { nullable: true })
  debtorRepresentative: DebtorRepresentativeModel;
  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
}
