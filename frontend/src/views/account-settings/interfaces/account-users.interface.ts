import { AccountUserTypeEnum } from 'views/company-register/enum';

export interface AccountUserInterface {
  accountId: string;
  accountUserType: AccountUserTypeEnum;
  birthday: string;
  email: string;
  firstName: string;
  id: string;
  language: string;
  lastName: string;
}
