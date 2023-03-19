import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { FileInterface } from 'modules/user-files/interfaces';

export interface FetchFilesActionVariablesInterface { }

export interface FetchFilesRequestInterface extends QueryOptions {
  variables: FetchFilesActionVariablesInterface;
}

export interface FetchFilesResponseInterface {
  totalCount: number;
  data: FileInterface[];
}

export const fetchFilesAction = createAsyncThunk(
  'files/fetch',
  (request: FetchFilesRequestInterface, thunkApi): Promise<FetchFilesResponseInterface> =>
    requestGql<FetchFilesResponseInterface>(request, thunkApi, 'files'),
);
