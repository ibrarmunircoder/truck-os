import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from '@roq/class-validator';

@InputType()
export class ChangePasswordDto {
  @Field()
  @IsDefined()
  @IsString()
  password: string;

  @Field()
  @IsDefined()
  @IsString()
  newPassword: string;
}
