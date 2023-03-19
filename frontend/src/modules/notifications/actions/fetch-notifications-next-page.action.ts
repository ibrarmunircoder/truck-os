import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { NotificationsInterface } from 'modules/notifications/notifications.slice';

export interface FetchNotificationsNextPageActionVariablesInterface {}

export interface FetchNotificationsNextPageRequestInterface extends QueryOptions {
  variables: FetchNotificationsNextPageActionVariablesInterface;
}

export interface FetchNotificationsNextPageResponseInterface {
  totalCount: number;
  data: NotificationsInterface;
}

export const fetchNotificationsNextPageAction = createAsyncThunk(
  'notifications/fetch-next-page',
  (
    request: FetchNotificationsNextPageRequestInterface,
    thunkApi,
  ): Promise<FetchNotificationsNextPageResponseInterface> =>
    requestGql<FetchNotificationsNextPageResponseInterface>(request, thunkApi, 'notificationWebs'),
);
