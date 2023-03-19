import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { AccountUserSearchKeyEnum } from 'src/factoring/enums';

@InputType()
export class AccountUserSearchArgType {
  @Field(() => AccountUserSearchKeyEnum)
  @IsDefined()
  @IsEnum(AccountUserSearchKeyEnum)
  key: AccountUserSearchKeyEnum;

  @Field()
  value: string;
}
