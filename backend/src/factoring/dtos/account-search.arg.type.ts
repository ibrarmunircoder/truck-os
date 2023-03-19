import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { AccountSearchKeyEnum } from 'src/factoring/enums';

@InputType()
export class AccountSearchArgType {
  @Field(() => AccountSearchKeyEnum)
  @IsDefined()
  @IsEnum(AccountSearchKeyEnum)
  key: AccountSearchKeyEnum;

  @Field()
  value: string;
}
