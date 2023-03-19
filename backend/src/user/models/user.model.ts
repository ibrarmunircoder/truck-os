import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountModel } from 'src/factoring/models';
import { UserLoginHistoryPageModel } from 'src/user/models';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  locale?: string;

  @Field({ nullable: true })
  timezone?: string;

  @Field()
  roqIdentifier: string;

  @Field({ nullable: true })
  optedInAt?: Date;

  @Field({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  sync?: boolean;

  @Field(() => UserLoginHistoryPageModel)
  userLoginHistories: UserLoginHistoryPageModel;

  @Field(() => AccountModel, { nullable: true })
  account?: AccountModel;

  @Field({
    nullable: true,
    middleware: [
      async (ctx, next) => {
        const value = await next();
        return Boolean(value);
      },
    ],
  })
  apiKey?: boolean;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
