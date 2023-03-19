import { plainToClass } from 'class-transformer';
import { AccountEntity } from 'src/factoring/entities';
import { AccountModel } from 'src/factoring/models';

export function mapAccountToModel(accountEntity: AccountEntity): AccountModel {
  const accountModel = plainToClass(AccountModel, accountEntity);
  return accountModel;
}
