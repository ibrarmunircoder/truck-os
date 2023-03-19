import { IFieldNestedSchema } from 'modules/common/interfaces';

export interface ICompanyBasicInfoFormModel {
  formId: string;
  formField: {
    companyName: IFieldNestedSchema;
    legalForm: IFieldNestedSchema;
    postcode: IFieldNestedSchema;
    address: IFieldNestedSchema;
    addressAddon: IFieldNestedSchema;
    city: IFieldNestedSchema;
    country: IFieldNestedSchema;
    registrationCourt: IFieldNestedSchema;
    registrationAuthorityCity: IFieldNestedSchema;
    registrationNumber: IFieldNestedSchema;
    companyVATID: IFieldNestedSchema;
    phoneNumber: IFieldNestedSchema;
  };
}

export const companyBasicInfoFormModel: ICompanyBasicInfoFormModel = {
  formId: 'CompanyBasicInfo',
  formField: {
    companyName: {
      name: 'companyName',
      placeholder: 'Company Name',
    },
    legalForm: {
      name: 'legalForm',
      placeholder: 'Legal Form',
    },
    postcode: {
      name: 'postalCode',
      placeholder: 'Postcode',
    },
    address: {
      name: 'streetAndNumber',
      placeholder: 'Street, Number',
    },
    addressAddon: {
      name: 'addressAddon',
      placeholder: 'Address Addon',
    },
    city: {
      name: 'city',
      placeholder: 'City',
    },
    country: {
      name: 'country',
      placeholder: 'Country',
    },
    phoneNumber: {
      name: 'phoneNumber',
      placeholder: 'Please Enter a Phone Number',
    },
    registrationCourt: {
      name: 'registrationAuthority',
      placeholder: 'Commercial Register Number',
    },
    registrationAuthorityCity: {
      name: 'registrationAuthorityCity',
    },
    registrationNumber: {
      name: 'registrationNumber',
      placeholder: 'Commercial Register',
    },
    companyVATID: {
      name: 'vatId',
      placeholder: 'VAT ID',
    },
  },
};
