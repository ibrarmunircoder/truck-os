import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { Trim } from 'src/library/decorators';

@InputType()
export class UserUpdateDto {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @MaxLength(255)
  @IsString()
  email?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @Trim()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @Trim()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  locale?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  apiKey?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  timezone?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  roqIdentifier?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  optedInAt?: Date;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  sync?: boolean;
}
