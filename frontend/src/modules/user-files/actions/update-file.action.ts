import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface UpdateFileRequestInterface extends MutationOptions {}

export interface UpdateFileResponseInterface {
  id: string;
  name: string;
}

export const updateFileAction = createAsyncThunk(
  'file/name-update',
  async (request: UpdateFileRequestInterface, thunkApi): Promise<UpdateFileResponseInterface> =>
    requestGql<UpdateFileResponseInterface>(request, thunkApi, 'updateFile'),
);
