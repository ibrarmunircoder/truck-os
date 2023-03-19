import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@roq/class-validator';
import { Trim } from 'src/library/decorators';

@InputType()
export class UserCreateDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @MaxLength(255)
  @IsString()
  @IsDefined()
  email: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  @IsDefined()
  password: string;

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
  timezone?: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  @IsDefined()
  roqIdentifier: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  optedInAt?: Date;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  sync?: boolean;
}
