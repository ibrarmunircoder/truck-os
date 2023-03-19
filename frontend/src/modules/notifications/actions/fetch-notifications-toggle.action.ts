import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { NotificationsInterface } from 'modules/notifications/notifications.slice';

export interface FetchNotificationsToggleActionVariablesInterface {}

export interface FetchNotificationsToggleRequestInterface extends QueryOptions {
  variables: FetchNotificationsToggleActionVariablesInterface;
}

export interface FetchNotificationsToggleResponseInterface {
  data: {
    loadNotifications: { totalCount: number; data: NotificationsInterface };
    loadToggleNotificationCount: { totalCount: number };
  };
}

const fetchNotificationCallBack = (
  request: FetchNotificationsToggleRequestInterface,
  thunkApi,
): Promise<FetchNotificationsToggleResponseInterface> =>
  requestGql<FetchNotificationsToggleResponseInterface>(request, thunkApi);

export const fetchNotificationsToggleAction = createAsyncThunk('notifications/toggle-fetch', fetchNotificationCallBack);
