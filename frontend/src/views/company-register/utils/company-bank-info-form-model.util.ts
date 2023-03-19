import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyBankInfoFormModel {
  formId: string;
  formField: {
    companyIBAN: IFieldNestedSchema;
    companyBIC: IFieldNestedSchema;
    welbingTerms: IFieldNestedSchema;
  };
}

export const companyBankInfoFormModel: ICompanyBankInfoFormModel = {
  formId: 'CompanyBankInfo',
  formField: {
    companyIBAN: {
      name: 'iban',
      placeholder: 'IBAN',
    },
    companyBIC: {
      name: 'bic',
      placeholder: 'BIC',
    },
    welbingTerms: {
      name: 'walbingTerm',
    },
  },
};
