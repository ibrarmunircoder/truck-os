import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { UserSearchKeyEnum } from 'src/user/enums';

@InputType()
export class UserSearchArgType {
  @Field(() => UserSearchKeyEnum)
  @IsDefined()
  @IsEnum(UserSearchKeyEnum)
  key: UserSearchKeyEnum;

  @Field()
  value: string;
}
