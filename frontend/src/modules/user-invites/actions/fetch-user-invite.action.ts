import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInterface } from 'modules/users/interfaces';

export interface FetchUserInviteActionVariablesInterface {
  id: string;
}

export interface FetchUserInviteRequestInterface extends QueryOptions {
  variables: FetchUserInviteActionVariablesInterface;
}

export interface FetchUserInviteResponseInterface {
  user: UserInterface;
}

export const fetchUserInviteAction = createAsyncThunk(
  'userInvites/fetchOne',
  (
    request: FetchUserInviteRequestInterface,
    thunkApi,
  ): Promise<FetchUserInviteResponseInterface> =>
    requestGql<FetchUserInviteResponseInterface>(request, thunkApi, 'userInvite'),
);
