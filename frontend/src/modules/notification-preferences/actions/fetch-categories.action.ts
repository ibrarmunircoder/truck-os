import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { NotificationPreferencesTypeCategoryInterface } from 'modules/notification-preferences/notification-preferences.slice';

export interface FetchCategoriesActionVariablesInterface {}

export interface FetchCategoriesRequestInterface extends QueryOptions {
  variables: FetchCategoriesActionVariablesInterface;
}

export interface FetchCategoriesResponseInterface {
  data: NotificationPreferencesTypeCategoryInterface[];
}

export const fetchCategoriesAction = createAsyncThunk(
  'notification-preferences/fetchCategories',
  async (
    request: FetchCategoriesRequestInterface,
    thunkApi,
  ): Promise<FetchCategoriesResponseInterface> =>
    requestGql<FetchCategoriesResponseInterface>(request, thunkApi, 'notificationTypeCategories'),
);
