/* eslint-disable @roq/filename-suffix-mismatch */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoringModule } from 'src/factoring';
import { AccountEntity } from 'src/factoring/entities';
import { AccountRepository } from 'src/factoring/repositories';
import { LibraryModule } from 'src/library';
import { UserModule } from 'src/user';
import { WebhookSignatureValidationMiddleware } from 'src/webhook/middlewares';
import { WebhookService } from 'src/webhook/services';
import { WebhookController } from 'src/webhook/webhook.controller';

@Module({
  imports: [UserModule, LibraryModule, TypeOrmModule.forFeature([AccountEntity, AccountRepository]), FactoringModule],
  providers: [WebhookService, WebhookSignatureValidationMiddleware],
  controllers: [WebhookController],
})
export class WebhookModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(WebhookSignatureValidationMiddleware).forRoutes(
      {
        path: '/webhook/walbing/login',
        method: RequestMethod.PUT,
      },
      {
        path: '/webhook/walbing/receivable',
        method: RequestMethod.PUT,
      },
      {
        path: '/webhook/walbing/debtor',
        method: RequestMethod.PUT,
      },
    );
  }
}
