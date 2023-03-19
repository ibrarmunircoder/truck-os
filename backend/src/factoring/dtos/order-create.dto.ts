import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';

@InputType()
export class OrderCreateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @Field({
    nullable: true,
    middleware: [
      async (ctx, next) => {
        const value = await next();
        return Number(value);
      },
    ],
  })
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
  paymentTerm?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  receivableReferenceId?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  applicableLaw?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
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

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  debtorRepresentativeId?: string;
}
