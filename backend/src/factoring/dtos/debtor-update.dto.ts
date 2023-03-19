import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';
import { DebtorStatusEnum } from 'src/factoring/enums';

@InputType()
export class DebtorUpdateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  vatNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  addressAddon?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  commercialRegister?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  commercialRegisterNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  legalForm?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  validated?: boolean;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  debtorReferenceId?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @Field(() => DebtorStatusEnum, { nullable: true })
  @IsEnum(DebtorStatusEnum)
  @IsOptional()
  status?: DebtorStatusEnum;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  streetAndNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  country?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  priority?: number;
}
