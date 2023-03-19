import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { DebtorStatusEnum } from 'src/factoring/enums';

export class DebtorWebhookDto {
  @MaxLength(255)
  @IsString()
  @IsOptional()
  uuid?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  referenceId?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  partnerCustomerId?: string;

  @IsInt()
  @IsOptional()
  timestamp?: string;

  @MaxLength(255)
  @IsEnum(DebtorStatusEnum)
  @IsOptional()
  status?: DebtorStatusEnum;
}
