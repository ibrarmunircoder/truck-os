/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/filename-suffix-mismatch */
import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyLegalRepresentativeFormModel {
  formId: string;
  formField: {
    isLegalRepresentative: IFieldNestedSchema;
    representativePower: IFieldNestedSchema;
  };
}

export const companyLegalRepresentativeFormModel: ICompanyLegalRepresentativeFormModel = {
  formId: 'CompanyLegalRepresentative',
  formField: {
    isLegalRepresentative: {
      name: 'legalRepresentative',
    },
    representativePower: {
      name: 'solePower',
    },
  },
};
