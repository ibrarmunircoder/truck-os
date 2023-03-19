import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInviteInterface } from 'modules/user-invites/interfaces';

export interface FetchUserInvitessActionVariablesInterface {}

export interface FetchUserInvitesRequestInterface extends QueryOptions {
  variables: FetchUserInvitessActionVariablesInterface;
}

export interface FetchUserInvitessResponseInterface {
  totalCount: number;
  data: UserInviteInterface[];
}

export const fetchUserInvitesAction = createAsyncThunk(
  'userInvites/fetch',
  (
    request: FetchUserInvitesRequestInterface,
    thunkApi,
  ): Promise<FetchUserInvitessResponseInterface> =>
    requestGql<FetchUserInvitessResponseInterface>(request, thunkApi, 'userInvites'),
);
