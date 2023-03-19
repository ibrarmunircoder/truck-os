import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DebtorStatusEnum } from 'src/factoring/enums';
import { AccountModel, DebtorRepresentativePageModel, OrderPageModel } from 'src/factoring/models';

@ObjectType()
export class DebtorModel {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  vatNumber?: string;

  @Field({ nullable: true })
  addressAddon?: string;

  @Field({ nullable: true })
  commercialRegister?: string;

  @Field({ nullable: true })
  commercialRegisterNumber?: string;

  @Field({ nullable: true })
  legalForm?: string;

  @Field({ nullable: true })
  validated?: boolean;

  @Field({ nullable: true })
  debtorReferenceId?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  streetAndNumber?: string;

  @Field({ nullable: true })
  isInternalDebtorFound?: boolean;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  debtorStatus?: string;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  status?: DebtorStatusEnum;

  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field(() => AccountModel, { nullable: true })
  account?: AccountModel;

  @Field(() => OrderPageModel, { nullable: true })
  orders?: OrderPageModel;

  @Field(() => DebtorRepresentativePageModel, { nullable: true })
  debtorRepresentatives?: DebtorRepresentativePageModel;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
