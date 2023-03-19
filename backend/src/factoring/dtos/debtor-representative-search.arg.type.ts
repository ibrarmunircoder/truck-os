import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { DebtorRepresentativeSearchKeyEnum } from 'src/factoring/enums';

@InputType()
export class DebtorRepresentativeSearchArgType {
  @Field(() => DebtorRepresentativeSearchKeyEnum)
  @IsDefined()
  @IsEnum(DebtorRepresentativeSearchKeyEnum)
  key: DebtorRepresentativeSearchKeyEnum;

  @Field()
  value: string;
}
