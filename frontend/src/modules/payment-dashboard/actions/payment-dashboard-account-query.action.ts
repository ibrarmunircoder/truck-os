import { gql } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export const paymentDashboardAccountQuery = createAsyncThunk(
  'payment-dashboard/account',
  async (userId: string, thunkApi) =>
    requestGql<void>(
      {
        query: gql`
          query accountQueryByUser($filter: AccountFilterArgType!) {
            accounts(filter: $filter) {
              data {
                id
                kycStatus
                vatId
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
