import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { AccountOrderSortEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class AccountOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => AccountOrderSortEnum)
  @IsDefined()
  @IsEnum(AccountOrderSortEnum)
  sort: AccountOrderSortEnum;
}
