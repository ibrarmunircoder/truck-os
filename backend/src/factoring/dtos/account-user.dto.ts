import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from '@roq/class-validator';
import { AccountUserAccountUserTypeEnum } from 'src/factoring/enums';

@InputType()
export class AccountUserDto {
  @Field(() => ID, { nullable: false })
  @IsUUID()
  id: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  firstName: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  lastName: string;

  @Field({ nullable: false })
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @IsDefined()
  email: string;

  @Field({ nullable: false })
  @IsDate()
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

  @Field(() => AccountUserAccountUserTypeEnum, { nullable: false })
  @IsEnum(AccountUserAccountUserTypeEnum)
  @IsDefined()
  accountUserType: AccountUserAccountUserTypeEnum;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  accountId?: string;
}
