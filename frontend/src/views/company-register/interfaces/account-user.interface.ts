import { AccountUserTypeEnum } from 'views/company-register/enum';

export interface AccountUserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  language?: string;
  accountUserType?: AccountUserTypeEnum;
  accountId?: string;
  index?: number;
  birthplace?: string;
  nationality?: string;
  postalCode?: string;
  streetAndNumber?: string;
  houseNumber?: number;
  city?: string;
  country?: string;
}
