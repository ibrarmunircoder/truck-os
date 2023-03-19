import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class WebhookSignatureValidationMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const webhookApiKeySecreteKey = this.configService.get(
      'application.walbingPaymentProcessor.walbingWebhookSecretKey',
    );
    const signature =
      req.headers.authorization && req.headers.authorization.includes('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!signature || signature !== webhookApiKeySecreteKey) {
      throw new BadRequestException('Invalid Request!');
    }
    next();
  }
}
