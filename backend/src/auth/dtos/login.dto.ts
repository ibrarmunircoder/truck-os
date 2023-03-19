import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';
import { Trim } from 'src/library/decorators';

@InputType()
export class LoginDto {
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

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  keepMeLoggedIn?: boolean;
}
