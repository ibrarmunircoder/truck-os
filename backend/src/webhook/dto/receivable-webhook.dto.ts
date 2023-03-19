import { IsArray, IsEnum, IsInt, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { ReceivableStatusEnum } from 'src/factoring/enums';

export class ReceivableWebhookDto {
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
  @IsEnum(ReceivableStatusEnum)
  @IsOptional()
  status?: ReceivableStatusEnum;

  @IsArray()
  @IsOptional()
  msgs?: string[];
}
