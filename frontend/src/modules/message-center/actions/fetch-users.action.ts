import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import { requestGql } from 'modules/common/utils/request-gql';
import { MessageCenterUserInterface } from 'modules/message-center';

export interface FetchUsersVariablesInterface extends PaginationInterface {}

export interface FetchUsersRequestInterface extends QueryOptions {
  variables: FetchUsersVariablesInterface;
}

export const fetchUsersAction = createAsyncThunk(
  'messageCenter/fetchUsers',
  async (request: FetchUsersRequestInterface, thunkApi): Promise<MessageCenterUserInterface[]> =>
    requestGql<MessageCenterUserInterface[]>(request, thunkApi, 'users'),
);
