import { IsInt, IsOptional, IsString, MaxLength } from '@roq/class-validator';

export class ApiKeyWebhookDto {
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
  @IsString()
  @IsOptional()
  clearTextApiKey?: string;
}
