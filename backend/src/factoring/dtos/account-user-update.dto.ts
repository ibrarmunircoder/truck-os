import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from '@roq/class-validator';
import { AccountUserAccountUserTypeEnum } from 'src/factoring/enums';

@InputType()
export class AccountUserUpdateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  language?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  birthplace?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  nationality?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  streetAndNumber?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  houseNumber?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  country?: string;

  @Field(() => AccountUserAccountUserTypeEnum, { nullable: true })
  @IsEnum(AccountUserAccountUserTypeEnum)
  @IsNotEmpty()
  accountUserType?: AccountUserAccountUserTypeEnum;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  accountId?: string;
}
