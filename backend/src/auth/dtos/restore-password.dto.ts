import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from '@roq/class-validator';

@InputType()
export class RestorePasswordDto {
  @Field()
  @IsDefined()
  @IsString()
  password: string;

  @Field()
  @IsDefined()
  @IsString()
  token: string;
}
