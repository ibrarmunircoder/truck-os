import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { businessDataUpdateAction } from 'modules/company-register/actions';
import { useDispatch } from 'react-redux';
import {
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyLegalRepresentativeFormModel,
  CompanyRegisterInterface,
} from 'views/company-register/utils';
const {
  city,
  companyName,
  country,
  phoneNumber,
  legalForm,
  postcode,
  address,
  registrationCourt,
  registrationAuthorityCity,
  registrationNumber,
  addressAddon,
  companyVATID,
} = companyBasicInfoFormModel.formField;
const { companyBIC, companyIBAN, welbingTerms } = companyBankInfoFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;
interface CompanyDataUpdateInterface {
  accountId: string;
  companyData: CompanyRegisterInterface;
}

interface UseAccountUpdateHookInterface {
  handleBusinessDataUpdate: (args: CompanyDataUpdateInterface) => void;
  handleCompanyBankInfoUpdate: (args: CompanyDataUpdateInterface) => void;
  handleCompanyLegalRepresentative: (args: CompanyDataUpdateInterface) => void;
}

export const useAccountUpdate = (): UseAccountUpdateHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCompanyLegalRepresentative = ({ accountId, companyData }: CompanyDataUpdateInterface) => {
    void dispatch(
      businessDataUpdateAction({
        mutation: gql`
          mutation updateCompanyLegaRepresentativeData($accountId: ID!, $companyData: AccountUpdateDto!) {
            updateAccount(id: $accountId, account: $companyData) {
              id
              solePower
              legalRepresentative
            }
          }
        `,
        variables: {
          accountId,
          companyData: {
            [isLegalRepresentative.name]: companyData[isLegalRepresentative.name],
            [representativePower.name]: companyData[representativePower.name],
          },
        },
        keyResponse: 'updateAccount',
      }),
    );
  };
  const handleCompanyBankInfoUpdate = ({ accountId, companyData }: CompanyDataUpdateInterface) => {
    void dispatch(
      businessDataUpdateAction({
        mutation: gql`
          mutation updateCompanyBankData($accountId: ID!, $companyData: AccountUpdateDto!) {
            updateAccount(id: $accountId, account: $companyData) {
              id
              bic
              iban
              walbingTerm
            }
          }
        `,
        variables: {
          accountId,
          companyData: {
            [companyBIC.name]: companyData[companyBIC.name],
            [companyIBAN.name]: companyData[companyIBAN.name],
            [welbingTerms.name]: companyData[welbingTerms.name],
          },
        },
        keyResponse: 'updateAccount',
      }),
    );
  };

  const handleBusinessDataUpdate = ({ accountId, companyData }: CompanyDataUpdateInterface) => {
    void dispatch(
      businessDataUpdateAction({
        mutation: gql`
          mutation updateBusinessData($accountId: ID!, $companyData: AccountUpdateDto!) {
            updateAccount(id: $accountId, account: $companyData) {
              id
              companyName
              legalForm
              city
              country
              vatId
              postalCode
              streetAndNumber
              registrationNumber
              registrationAuthority
              registrationAuthorityCity
              addressAddon
              phoneNumber
            }
          }
        `,
        variables: {
          accountId,
          companyData: {
            [companyName.name]: companyData[companyName.name],
            [legalForm.name]: companyData[legalForm.name],
            [city.name]: companyData[city.name],
            [country.name]: companyData[country.name],
            [phoneNumber.name]: companyData[phoneNumber.name],
            [postcode.name]: companyData[postcode.name],
            [address.name]: companyData[address.name],
            [registrationCourt.name]: companyData[registrationCourt.name],
            [registrationAuthorityCity.name]: companyData[registrationAuthorityCity.name],
            [registrationNumber.name]: companyData[registrationNumber.name],
            [addressAddon.name]: companyData[addressAddon.name],
            [companyVATID.name]: companyData[companyVATID.name],
          },
        },
        keyResponse: 'updateAccount',
      }),
    );
  };

  return {
    handleBusinessDataUpdate,
    handleCompanyBankInfoUpdate,
    handleCompanyLegalRepresentative,
  };
};
