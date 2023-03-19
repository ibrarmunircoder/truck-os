import { gql } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export const accountQueryAction = createAsyncThunk('company-register/account', async (userId: string, thunkApi) =>
  requestGql<void>(
    {
      query: gql`
        query accountQueryByUser($filter: AccountFilterArgType!) {
          accounts(filter: $filter) {
            data {
              id
              companyName
              legalForm
              city
              country
              virtualDetails {
                iban
                bic
              }
              postalCode
              streetAndNumber
              addressAddon
              registrationNumber
              registrationAuthority
              registrationAuthorityCity
              kycStatus
              phoneNumber
              iban
              bic
              vatId
              walbingTerm
              solePower
              legalRepresentative
              accountFiles {
                id
                name
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
                  birthplace
                  nationality
                  postalCode
                  streetAndNumber
                  houseNumber
                  city
                  country
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
