import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountUserAccountUserTypeEnum } from 'src/factoring/enums';
import { AccountModel } from 'src/factoring/models';

@ObjectType()
export class AccountUserModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  birthplace?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  streetAndNumber?: string;

  @Field({ nullable: true })
  houseNumber?: number;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => AccountUserAccountUserTypeEnum)
  accountUserType: AccountUserAccountUserTypeEnum;

  @Field(() => ID, { nullable: false })
  accountId: string;

  @Field(() => AccountModel, { nullable: false })
  account: AccountModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
