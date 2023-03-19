import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyAddRepresentativeFormModel {
  formId: string;
  formField: {
    representatives: IFieldNestedSchema;
  };
}

export const companyAddRepresentativeFormModel: ICompanyAddRepresentativeFormModel = {
  formId: 'CompanyAddRepresentative',
  formField: {
    representatives: {
      name: 'representatives',
      placeholder: 'Representatives',
      nestedFields: [
        { name: 'firstName', placeholder: 'First Name' },
        { name: 'lastName', placeholder: 'Last Name' },
        { name: 'email', placeholder: 'E-Mail' },
        { name: 'birthday', placeholder: 'Date of birth (DD/MM/YYYY)' },
        { name: 'language', placeholder: 'Language' },
        { name: 'accountUserType', placeholder: 'Account User Type' },
      ],
    },
  },
};
