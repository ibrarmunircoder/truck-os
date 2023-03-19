import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { Trim } from 'src/library/decorators';

@InputType()
export class ResendEmailDto {
  @Field()
  @IsEmail()
  @Trim()
  @IsDefined()
  @IsString()
  email: string;
}
