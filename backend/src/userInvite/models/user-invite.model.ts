import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JsonObject } from 'src/library/scalars';
import { UserModel } from 'src/user/models';
import { UserTokenModel } from 'src/userInvite/models';

@ObjectType()
export class UserInviteModel {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  locale?: string;

  @Field(() => JsonObject, { nullable: true })
  data?: Record<string, unknown>;

  @Field()
  status: string;

  @Field(() => ID, { nullable: false })
  createdByUserId: string;

  @Field(() => UserModel, { nullable: false })
  createdBy: UserModel;

  @Field(() => ID, { nullable: true })
  acceptedByUserId?: string;

  @Field(() => UserModel, { nullable: true })
  acceptedBy?: UserModel;

  @Field(() => ID, { nullable: false })
  userTokenId: string;

  @Field(() => UserTokenModel, { nullable: false })
  userToken: UserTokenModel;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  @Type(() => Date)
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  statusUpdatedAt?: Date;
}
