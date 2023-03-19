import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInterface } from 'modules/users/interfaces';

export interface FetchUserActionVariablesInterface {
  id: string;
}

export interface FetchUserRequestInterface extends QueryOptions {
  variables: FetchUserActionVariablesInterface;
}

export interface FetchUserResponseInterface {
  user: UserInterface;
}

export const fetchUserAction = createAsyncThunk(
  'user/fetchOne',
  (request: FetchUserRequestInterface, thunkApi): Promise<FetchUserResponseInterface> =>
    requestGql<FetchUserResponseInterface>(request, thunkApi, 'user'),
);
