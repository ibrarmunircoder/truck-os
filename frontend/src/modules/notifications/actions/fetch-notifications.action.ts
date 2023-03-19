import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { NotificationsInterface } from 'modules/notifications/notifications.slice';

export interface FetchNotificationsActionVariablesInterface {}

export interface FetchNotificationsRequestInterface extends QueryOptions {
  variables: FetchNotificationsActionVariablesInterface;
}

export interface FetchNotificationsResponseInterface {
  data: {
    loadNotifications: { totalCount: number; data: NotificationsInterface };
    loadUnreadNotificationCount: { totalCount: number };
  };
}

const fetchNotificationCallBack = (
  request: FetchNotificationsRequestInterface,
  thunkApi,
): Promise<FetchNotificationsResponseInterface> => requestGql<FetchNotificationsResponseInterface>(request, thunkApi);

export const fetchNotificationsAction = createAsyncThunk('notifications/fetch', fetchNotificationCallBack);
