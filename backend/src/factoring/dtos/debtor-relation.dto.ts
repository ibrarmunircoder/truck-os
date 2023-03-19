import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { DebtorRelationContactsDto } from 'src/factoring/dtos';

@InputType()
export class DebtorRelationDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  customerReference?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  applicableLaw?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  paymentTerms?: number;

  @Field(() => [DebtorRelationContactsDto], { nullable: true })
  @IsInt()
  @IsOptional()
  contacts?: DebtorRelationContactsDto[];
}
