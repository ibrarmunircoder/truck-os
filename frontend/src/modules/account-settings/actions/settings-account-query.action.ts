import { gql } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export const settingsAccountQueryAction = createAsyncThunk(
  'account-settings/account',
  async (userId: string, thunkApi) =>
    requestGql<void>(
      {
        query: gql`
          query accountQueryByUser($filter: AccountFilterArgType!) {
            accounts(filter: $filter) {
              data {
                id
                virtualDetails {
                  iban
                  bic
                }
                companyName
                legalForm
                city
                country
                postalCode
                streetAndNumber
                registrationNumber
                registrationAuthority
                registrationAuthorityCity
                phoneNumber
                iban
                bic
                kycStatus
                vatId
                walbingTerm
                solePower
                legalRepresentative
                accountFiles {
                  id
                  name
                  url
                }
                accountUsers {
                  data {
                    id
                    firstName
                    lastName
                    birthday
                    email
                    language
                    accountUserType
                    accountId
                  }
                }
              }
            }
          }
        `,
        variables: { filter: { userId: { equalTo: userId } } },
      },
      thunkApi,
      'accounts',
    ),
);
