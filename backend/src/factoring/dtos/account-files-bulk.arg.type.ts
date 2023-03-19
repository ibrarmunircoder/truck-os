import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AccountFilesFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class AccountFilesBulkArgType {
  @Field(() => AccountFilesFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountFilesFilterArgType)
  filter?: AccountFilesFilterArgType;
}
