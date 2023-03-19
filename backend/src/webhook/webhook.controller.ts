/* eslint-disable @roq/filename-suffix-mismatch */
import { Body, Controller, Put } from '@nestjs/common';
import { ApiKeyWebhookDto, DebtorWebhookDto, ReceivableWebhookDto } from 'src/webhook/dto';
import { WebhookService } from 'src/webhook/services';

@Controller()
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Put('/webhook/walbing/login')
  saveUserApiKey(@Body() payload: ApiKeyWebhookDto): Promise<void> {
    return this.webhookService.saveUserApiKey(payload);
  }

  @Put('/webhook/walbing/receivable')
  saveReceivableStatus(@Body() payload: ReceivableWebhookDto): Promise<void> {
    return this.webhookService.saveReceivableStatus(payload);
  }
  @Put('/webhook/walbing/debtor')
  saveDebtorStatus(@Body() payload: DebtorWebhookDto): Promise<void> {
    return this.webhookService.saveDebtorStatus(payload);
  }
}
