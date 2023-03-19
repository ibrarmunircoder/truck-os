import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import { requestGql } from 'modules/common/utils/request-gql';
import { MessageCenterUserInterface } from 'modules/message-center';

export interface FetchRecipientsVariablesInterface extends PaginationInterface {
  filter?: string,
  ids?: string[],
  excludeIds?: string[],
  includeIds?: string[],
}

export interface FetchRecipientsRequestInterface extends QueryOptions {
  variables: FetchRecipientsVariablesInterface;
}

export const fetchRecipientsAction = createAsyncThunk(
  'messageCenter/fetchRecipients',
  async (request: FetchRecipientsRequestInterface, thunkApi): Promise<MessageCenterUserInterface[]> =>
    requestGql<MessageCenterUserInterface[]>(request, thunkApi, 'users'),
);
