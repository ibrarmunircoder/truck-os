import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInterface } from 'modules/users/interfaces';

export interface FetchUsersActionVariablesInterface {}

export interface FetchUsersRequestInterface extends QueryOptions {
  variables: FetchUsersActionVariablesInterface;
}

export interface FetchUsersResponseInterface {
  totalCount: number;
  data: UserInterface[];
}

export const fetchUsersAction = createAsyncThunk(
  'users/fetch',
  (request: FetchUsersRequestInterface, thunkApi): Promise<FetchUsersResponseInterface> =>
    requestGql<FetchUsersResponseInterface>(request, thunkApi, 'users'),
);
