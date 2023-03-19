import { AccountUserTypeEnum } from 'views/company-register/enum';
import {
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyDocumentUploadFormModel,
  companyLegalRepresentativeFormModel,
} from 'views/company-register/utils';

const {
  city,
  companyName,
  country,
  legalForm,
  postcode,
  address,
  registrationCourt,
  registrationAuthorityCity,
  registrationNumber,
  addressAddon,
  phoneNumber,
  companyVATID,
} = companyBasicInfoFormModel.formField;
const { companyDocument } = companyDocumentUploadFormModel.formField;
const { companyBIC, companyIBAN, welbingTerms } = companyBankInfoFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;
const { representatives } = companyAddRepresentativeFormModel.formField;
const { owners } = companyAddOwnerFormModel.formField;

export interface CompanyRegisterInterface {
  [key: string]: string | boolean | number | { [key: string]: string | number }[];
}

export const initialValues: CompanyRegisterInterface = {
  [companyName.name]: '',
  [legalForm.name]: '',
  [postcode.name]: '',
  [address.name]: '',
  [addressAddon.name]: '',
  [city.name]: '',
  [country.name]: 'DE',
  [phoneNumber.name]: '49',
  [registrationCourt.name]: '',
  [registrationAuthorityCity.name]: '',
  [registrationNumber.name]: '',
  [companyDocument.name]: [],
  [companyBIC.name]: '',
  [companyIBAN.name]: '',
  [companyVATID.name]: '',
  [welbingTerms.name]: false,
  [isLegalRepresentative.name]: false,
  [representativePower.name]: true,
  [representatives.name]: [
    {
      [representatives.nestedFields[0].name]: '',
      [representatives.nestedFields[1].name]: '',
      [representatives.nestedFields[2].name]: '',
      [representatives.nestedFields[3].name]: new Date(0).toUTCString(),
      [representatives.nestedFields[4].name]: 'en',
      [representatives.nestedFields[5].name]: AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE,
    },
  ],
  [owners.name]: [],
};
