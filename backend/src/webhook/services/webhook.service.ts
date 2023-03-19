import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountKycStatusEnum, DebtorStatusEnum, ReceivableStatusEnum } from 'src/factoring/enums';
import { AccountRepository } from 'src/factoring/repositories';
import { DebtorService, OrderService } from 'src/factoring/services';
import { UserService } from 'src/user/services';
import { ApiKeyWebhookDto, DebtorWebhookDto, ReceivableWebhookDto } from 'src/webhook/dto';
import {
  DebtorProblemEnum,
  DebtorVerifiedEnum,
  DebtorWaitingEnum,
  ReceivableCompleteEnum,
  ReceivableProblemEnum,
  ReceivableWaitingEnum,
} from 'src/webhook/enum';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(AccountRepository)
    protected accountRepository: AccountRepository,
    private userService: UserService,
    private orderService: OrderService,
    private debtorService: DebtorService,
  ) {}

  public async saveUserApiKey(payload: ApiKeyWebhookDto): Promise<void> {
    try {
      const { clearTextApiKey, partnerCustomerId } = payload;
      await this.userService.update(partnerCustomerId, { apiKey: clearTextApiKey });
      await this.accountRepository.update(
        {
          userId: partnerCustomerId,
        },
        {
          kycStatus: AccountKycStatusEnum.COMPLETED,
        },
      );
    } catch (err) {
      console.error(err);
    }
  }

  public getDebtorStatusPriority(status: DebtorStatusEnum): number {
    return DebtorProblemEnum[status] !== undefined
      ? 0
      : DebtorWaitingEnum[status] !== undefined
      ? 1
      : DebtorVerifiedEnum[status] !== undefined
      ? 2
      : 3;
  }
  public getOrderStatusPriority(status: ReceivableStatusEnum): number {
    return ReceivableProblemEnum[status] !== undefined
      ? 0
      : ReceivableWaitingEnum[status] !== undefined
      ? 2
      : ReceivableCompleteEnum[status] !== undefined
      ? 3
      : 4;
  }

  public async saveReceivableStatus(payload: ReceivableWebhookDto): Promise<void> {
    try {
      const { referenceId, status } = payload;
      const orders = await this.orderService.find({ filter: { receivableReferenceId: { equalTo: referenceId } } });
      if (orders && orders.length) {
        const priority = this.getOrderStatusPriority(status);
        await this.orderService.update(orders[0].id, { status, priority });
      }
    } catch (err) {
      console.error(err);
    }
  }
  public async saveDebtorStatus(payload: DebtorWebhookDto): Promise<void> {
    try {
      const { referenceId, status } = payload;
      const debtors = await this.debtorService.find({ filter: { debtorReferenceId: { equalTo: referenceId } } });
      if (debtors && debtors.length) {
        const priority = this.getDebtorStatusPriority(status);
        await this.debtorService.update(debtors[0].id, { status, priority });
      }
    } catch (err) {
      console.error(err);
    }
  }
}
