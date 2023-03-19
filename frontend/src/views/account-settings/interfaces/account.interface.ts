import { AccountKycStatusEnum } from 'modules/company-register/enum';
import { AccountFileInterface } from 'views/account-settings/interfaces/account-files.interface';
import { AccountUserDataInterface } from 'views/account-settings/interfaces/account-users-data.interface';

export interface AccountInterface {
  accountUsers?: AccountUserDataInterface;
  accountFiles?: AccountFileInterface[];
  bic?: string;
  city?: string;
  companyName?: string;
  country?: string;
  iban?: string;
  id?: string;
  legalForm?: string;
  legalRepresentative?: boolean;
  postalCode?: string;
  registrationAuthority?: string;
  registrationNumber?: string;
  solePower?: boolean;
  streetAndNumber?: string;
  vatId?: string;
  walbingTerm?: boolean;
  kycStatus?: AccountKycStatusEnum;
}
