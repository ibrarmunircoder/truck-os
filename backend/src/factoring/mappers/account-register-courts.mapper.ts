import { plainToClass } from 'class-transformer';
import { AccountRegisterCourtInterface } from 'src/factoring/interfaces';
import { AccountRegisterCourtModel } from 'src/factoring/models';

export function mapAccountRegisterCourtsToModel(
  accountRegisterCourt: AccountRegisterCourtInterface,
): AccountRegisterCourtModel {
  const accountRegisterCourtModel = plainToClass(AccountRegisterCourtModel, accountRegisterCourt);
  return accountRegisterCourtModel;
}
