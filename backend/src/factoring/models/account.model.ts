import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountKycStatusEnum } from 'src/factoring/enums';
import { AccountUserPageModel, DebtorPageModel, OrderPageModel, PaymentDetailsModel } from 'src/factoring/models';
import { UserModel } from 'src/user/models';

@ObjectType()
export class AccountModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  companyName?: string;

  @Field({ nullable: true })
  legalForm?: string;

  @Field({ nullable: true })
  companyRegisterNumber?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  streetAndNumber?: string;

  @Field({ nullable: true })
  addressAddon?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  iban?: string;

  @Field(() => PaymentDetailsModel, { nullable: true })
  virtualDetails: PaymentDetailsModel;

  @Field({ nullable: true })
  bic?: string;

  @Field({ nullable: true })
  vatId?: string;

  @Field({ nullable: true })
  registrationAuthority?: string;

  @Field({ nullable: true })
  registrationAuthorityCity?: string;

  @Field({ nullable: true })
  registrationNumber?: string;

  @Field({ nullable: true })
  legalRepresentative?: boolean;

  @Field({ nullable: true })
  solePower?: boolean;

  @Field({ nullable: true })
  walbingTerm?: boolean;

  @Field(() => UserModel)
  user: UserModel;

  @Field({ nullable: true })
  kycStatus: AccountKycStatusEnum;

  @Field(() => AccountUserPageModel)
  accountUsers: AccountUserPageModel;

  @Field(() => OrderPageModel)
  orders: OrderPageModel;

  @Field(() => DebtorPageModel)
  debtors: DebtorPageModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
