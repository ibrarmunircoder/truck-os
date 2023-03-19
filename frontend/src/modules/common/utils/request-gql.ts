import { MutationOptions, QueryOptions } from '@apollo/client';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { apolloClient } from 'configuration/apollo/apollo-client';
import { NetworkOfflineError } from 'modules/common/errors';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const handleNetworkOffline = (thunkApi) => {
  if (!window.navigator.onLine) {
    throw thunkApi ? thunkApi.rejectWithValue(new NetworkOfflineError()) : new NetworkOfflineError();
  }
};

export async function requestGql<T>(
  request: QueryOptions | MutationOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thunkApi?: BaseThunkAPI<unknown, unknown, ThunkDispatch<unknown, unknown, AnyAction>, unknown> | undefined | null,
  responseKey?: string,
): Promise<T> {
  try {
    handleNetworkOffline(thunkApi);

    if ('query' in request && responseKey) {
      const {
        data: { [responseKey]: response },
      } = await apolloClient().query(request);
      return response;
    } else if ('mutation' in request && responseKey) {
      const {
        data: { [responseKey]: response },
      } = await apolloClient().mutate(request);
      return response;
    } else if ('query' in request && !responseKey) {
      const { data: response } = await apolloClient().query(request);
      return response;
    } else if ('mutation' in request && !responseKey) {
      const { data: response } = await apolloClient().mutate(request);
      return response;
    }
  } catch (error) {
    if (thunkApi) {
      throw thunkApi.rejectWithValue(error);
    }
    throw error;
  }
}
