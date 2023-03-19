import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsEnum, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { AccountKycStatusEnum } from 'src/factoring/enums';

@InputType()
export class AccountCreateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  companyName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  legalForm?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  companyRegisterNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @Field(() => AccountKycStatusEnum, { nullable: false })
  @IsEnum(AccountKycStatusEnum)
  @IsDefined()
  kycStatus?: AccountKycStatusEnum;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  streetAndNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  addressAddon?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  iban?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  bic?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  vatId?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  registrationAuthority?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  registrationAuthorityCity?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  legalRepresentative?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  solePower?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;
}
