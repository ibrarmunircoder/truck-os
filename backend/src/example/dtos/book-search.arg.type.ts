import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { BookSearchKeyEnum } from 'src/example/enums';

@InputType()
export class BookSearchArgType {
  @Field(() => BookSearchKeyEnum)
  @IsDefined()
  @IsEnum(BookSearchKeyEnum)
  key: BookSearchKeyEnum;

  @Field()
  value: string;
}
