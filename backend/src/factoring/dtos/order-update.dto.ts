import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';
import { ReceivableStatusEnum } from 'src/factoring/enums';
@InputType()
export class OrderUpdateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  priority?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  deliveryDate?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  invoiceDate?: Date;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  applicableLaw?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  paymentTerm?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  receivableReferenceId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  invoiceAmount?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  receivableAmount?: number;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  debtorId?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  draft?: boolean;

  @Field(() => ReceivableStatusEnum, { nullable: true })
  @IsEnum(ReceivableStatusEnum)
  @IsOptional()
  status?: ReceivableStatusEnum;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  debtorRepresentativeId?: string;
}
