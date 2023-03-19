import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyAddOwnerFormModel {
  formId: string;
  formField: {
    owners: IFieldNestedSchema;
  };
}

export const companyAddOwnerFormModel: ICompanyAddOwnerFormModel = {
  formId: 'CompanyAddOwnerFormModel',
  formField: {
    owners: {
      name: 'owners',
      placeholder: 'Beneficial owner',
      nestedFields: [
        { name: 'firstName', placeholder: 'First Name' },
        { name: 'lastName', placeholder: 'Last Name' },
        { name: 'email', placeholder: 'E-Mail' },
        { name: 'birthday', placeholder: 'Date of birth (DD/MM/YYYY)' },
        { name: 'accountUserType', placeholder: 'Account User Type' },
        { name: 'birthplace', placeholder: 'Place of Birth' },
        { name: 'nationality', placeholder: 'Nationality' },
        { name: 'streetAndNumber', placeholder: 'Street' },
        { name: 'postalCode', placeholder: 'Postcode' },
        { name: 'city', placeholder: 'City' },
        { name: 'country', placeholder: 'Country' },
        { name: 'houseNumber', placeholder: 'House number' },
      ],
    },
  },
};
