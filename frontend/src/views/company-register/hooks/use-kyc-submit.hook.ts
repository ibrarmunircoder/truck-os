import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { requestGql } from 'modules/common/utils/request-gql';
import {
  resetError,
  setError,
  updateAddStepAction,
} from 'modules/company-register/company-register.slice';
import { accountRegisterSelector } from 'modules/company-register/selectors/account-register.selector';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountUserInterface } from 'views/company-register/interfaces';

interface UseKycSubmitHookInterface {
  handleKycSubmission: () => void;
  handleResetError: () => void;
  error: Error | null;
}
interface AccountSubmitInterface {
  bic: string;
  city: string;
  companyName: string;
  country: string;
  iban: string;
  id: string;
  legalForm: string;
  legalRepresentative: boolean;
  postalCode: string;
  registrationAuthority: string;
  registrationNumber: string;
  solePower: boolean;
  streetAndNumber: string;
  vatId: string;
  owners: AccountUserInterface[];
  representatives: AccountUserInterface[];
}

const companyRegisterMutationOptions = (account: AccountSubmitInterface) => ({
  mutation: gql`
    mutation registerCompany($account: AccountSubmitDto!) {
      registerCompany(account: $account)
    }
  `,
  variables: {
    account,
  },
});

export const useKycSubmit = (): UseKycSubmitHookInterface => {
  const { account, viewActiveStep, error } = useSelector(accountRegisterSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handleResetError = useCallback(() => dispatch(resetError()), [dispatch]);

  const handleKycSubmission = async () => {
    const owners = account.owners as [];
    const representatives = account.representatives as [];
    const accountSubmitData = {
      bic: account.bic,
      city: account.city,
      companyName: account.companyName,
      country: account.country,
      iban: account.iban,
      id: account.id,
      legalForm: account.legalForm,
      legalRepresentative: account.legalRepresentative,
      postalCode: account.postalCode,
      registrationAuthority: account.registrationAuthority,
      registrationNumber: account.registrationNumber,
      solePower: account.solePower,
      streetAndNumber: account.streetAndNumber,
      addressAddon: account.addressAddon,
      vatId: account.vatId,
      owners: owners.map((owner: AccountUserInterface) => ({
        id: owner.id,
        accountId: owner.accountId,
        accountUserType: owner.accountUserType,
        birthday: owner.birthday,
        birthplace: owner.birthplace,
        city: owner.city,
        country: owner.country,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName,
        nationality: owner.nationality,
        postalCode: owner.postalCode,
        streetAndNumber: owner.streetAndNumber,
        houseNumber: owner.houseNumber,
      })),
      representatives: representatives.map((representative: AccountUserInterface) => ({
        id: representative.id,
        accountId: representative.accountId,
        accountUserType: representative.accountUserType,
        birthday: representative.birthday,
        email: representative.email,
        firstName: representative.firstName,
        lastName: representative.lastName,
        language: representative.language,
      })),
    };
    try {
      await requestGql(
        companyRegisterMutationOptions(accountSubmitData as AccountSubmitInterface),
        null,
        'registerCompany',
      );
      void dispatch(updateAddStepAction(viewActiveStep + 1));
    } catch (err) {
      void dispatch(setError(err));
      console.error(err);
    }
  };

  return {
    handleKycSubmission,
    handleResetError,
    error,
  };
};
