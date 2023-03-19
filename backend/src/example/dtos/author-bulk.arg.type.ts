import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AuthorFilterArgType } from 'src/example/dtos';

@ArgsType()
export class AuthorBulkArgType {
  @Field(() => AuthorFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AuthorFilterArgType)
  filter?: AuthorFilterArgType;
}
