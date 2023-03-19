import { plainToClass } from 'class-transformer';
import { PaymentProcessorDebtorDataModel } from 'src/factoring/models';
import { DebtorInfoInterface } from 'src/factoring/providers/interfaces';

export function mapPaymentProcessorDebtorToModel(debtorInfoInterface: DebtorInfoInterface): PaymentProcessorDebtorDataModel {
  const paymentProcessorDebtorDataModel = plainToClass(PaymentProcessorDebtorDataModel, debtorInfoInterface);
  return paymentProcessorDebtorDataModel;
}
