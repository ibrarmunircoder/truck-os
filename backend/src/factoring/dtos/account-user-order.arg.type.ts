import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { AccountUserOrderSortEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class AccountUserOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => AccountUserOrderSortEnum)
  @IsDefined()
  @IsEnum(AccountUserOrderSortEnum)
  sort: AccountUserOrderSortEnum;
}
