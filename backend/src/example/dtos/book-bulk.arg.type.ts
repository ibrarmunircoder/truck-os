import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { BookFilterArgType } from 'src/example/dtos';

@ArgsType()
export class BookBulkArgType {
  @Field(() => BookFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BookFilterArgType)
  filter?: BookFilterArgType;
}
