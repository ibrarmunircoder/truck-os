import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { DebtorSearchKeyEnum } from 'src/factoring/enums';

@InputType()
export class DebtorSearchArgType {
  @Field(() => DebtorSearchKeyEnum)
  @IsDefined()
  @IsEnum(DebtorSearchKeyEnum)
  key: DebtorSearchKeyEnum;

  @Field()
  value: string;
}
