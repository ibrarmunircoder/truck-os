import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { FileInterface } from 'modules/user-files/interfaces';

export interface FetchFileActionVariablesInterface { }

export interface FetchFileRequestInterface extends QueryOptions {
  variables: FetchFileActionVariablesInterface;
}

export interface FetchFileResponseInterface {
  file: FileInterface;
}

export const fetchFileAction = createAsyncThunk(
  'file/fetch',
  async (
    request: FetchFileRequestInterface,
    thunkApi,
  ): Promise<FetchFileResponseInterface> => requestGql<FetchFileResponseInterface>(request, thunkApi, 'file')
);
