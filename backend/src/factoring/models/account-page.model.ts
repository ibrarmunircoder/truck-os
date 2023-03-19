import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AccountModel } from 'src/factoring/models';

@ObjectType()
export class AccountPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [AccountModel])
  data: AccountModel[];
}
