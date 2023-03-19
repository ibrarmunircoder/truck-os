import { plainToClass } from 'class-transformer';
import { DebtorEntity } from 'src/factoring/entities';
import { DebtorModel } from 'src/factoring/models';

export function mapDebtorToModel(debtorEntity: DebtorEntity): DebtorModel {
  const debtorModel = plainToClass(DebtorModel, debtorEntity);
  return debtorModel;
}
