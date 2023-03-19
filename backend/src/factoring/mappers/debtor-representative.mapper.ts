import { plainToClass } from 'class-transformer';
import { DebtorRepresentativeEntity } from 'src/factoring/entities';
import { DebtorRepresentativeModel } from 'src/factoring/models';

export function mapDebtorRepresentativeToModel(
  debtorRepresentativeEntity: DebtorRepresentativeEntity,
): DebtorRepresentativeModel {
  const debtorRepresentativeModel = plainToClass(DebtorRepresentativeModel, debtorRepresentativeEntity);
  return debtorRepresentativeModel;
}
