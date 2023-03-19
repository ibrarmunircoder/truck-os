import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/models';
import { UserInviteModel } from 'src/userInvite/models';

@ObjectType()
export class UserTokenModel {
  @Field(() => ID)
  id: string;

  @Field()
  token: string;

  @Field()
  type: string;

  @Field()
  validTill: Date;

  @Field(() => ID, { nullable: false })
  userId: string;

  @Field(() => UserModel, { nullable: false })
  user: UserModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field(() => UserInviteModel, { nullable: true })
  userInvite: UserInviteModel;
}
