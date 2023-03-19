import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AccountUserModel } from 'src/factoring/models';

@ObjectType()
export class AccountUserPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [AccountUserModel])
  data: AccountUserModel[];
}
