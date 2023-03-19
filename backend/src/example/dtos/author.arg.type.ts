import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import {
  AuthorFilterArgType,
  AuthorOrderArgType,
  AuthorSearchArgType,
} from 'src/example/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class AuthorArgType extends BaseArgType {
  @Field(() => AuthorSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AuthorSearchArgType)
  search?: AuthorSearchArgType;

  @Field(() => AuthorOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AuthorOrderArgType)
  order?: AuthorOrderArgType;

  @Field(() => AuthorFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AuthorFilterArgType)
  filter?: AuthorFilterArgType;
}
