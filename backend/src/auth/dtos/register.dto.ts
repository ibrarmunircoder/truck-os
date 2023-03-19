import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString } from '@roq/class-validator';
import { Trim } from 'src/library/decorators';

@InputType()
export class RegisterDto {
  @Field()
  @IsDefined()
  @IsString()
  @Trim()
  firstName: string;

  @Field()
  @IsDefined()
  @IsString()
  @Trim()
  lastName: string;

  @Field()
  @IsEmail()
  @Trim()
  @IsDefined()
  @IsString()
  email: string;

  @Field()
  @IsDefined()
  @IsString()
  password: string;

  @Field()
  @IsDefined()
  @IsString()
  timezone: string;

  @Field()
  @IsDefined()
  @IsString()
  locale: string;
}
