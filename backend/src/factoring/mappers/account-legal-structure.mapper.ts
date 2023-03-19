import { plainToClass } from 'class-transformer';
import { AccountLegalStructure } from 'src/factoring/interfaces';
import { AccountLegalStructureModel } from 'src/factoring/models';

export function mapAccountLegalStructureToModel(
  accountLegalStructure: AccountLegalStructure,
): AccountLegalStructureModel {
  const accountLegalStructureModal = plainToClass(AccountLegalStructureModel, accountLegalStructure);
  return accountLegalStructureModal;
}
