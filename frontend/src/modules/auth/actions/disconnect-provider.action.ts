import { gql } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export const disconnectProviderAction = createAsyncThunk(
  'auth/disconnectProvider',
  (providerId: string, thunkApi): Promise<true> =>
    requestGql<true>({
      variables: { input: { providerId } },
      mutation: gql`
        mutation providerDisconnect($input: ProviderDisconnectDto!) {
          providerDisconnect(input: $input)
        }
      `,
    }, thunkApi, 'providerDisconnect'),
);
