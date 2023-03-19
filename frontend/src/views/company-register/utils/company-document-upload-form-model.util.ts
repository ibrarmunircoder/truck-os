/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/filename-suffix-mismatch */
import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyDocumentUploadFormModel {
  formId: string;
  formField: {
    companyDocument: IFieldNestedSchema;
  };
}

export const companyDocumentUploadFormModel: ICompanyDocumentUploadFormModel = {
  formId: 'CompanyDocumentUpload',
  formField: {
    companyDocument: {
      name: 'accountFiles',
      placeholder: 'Trade registration ',
    },
  },
};
