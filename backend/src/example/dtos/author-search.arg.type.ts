import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { AuthorSearchKeyEnum } from 'src/example/enums';

@InputType()
export class AuthorSearchArgType {
  @Field(() => AuthorSearchKeyEnum)
  @IsDefined()
  @IsEnum(AuthorSearchKeyEnum)
  key: AuthorSearchKeyEnum;

  @Field()
  value: string;
}
