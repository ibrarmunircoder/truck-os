import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { NotificationPreferencesTypeUserInterface } from 'modules/notification-preferences/notification-preferences.slice';

export interface ToggleNotificationPreferenceActionVariablesInterface {
  web: boolean
  mail: boolean
  notificationTypeId: string
  key?: string
  id?: string
}

export interface ToggleNotificationPreferenceRequestInterface extends MutationOptions {
  variables: ToggleNotificationPreferenceActionVariablesInterface;
}

export interface ToggleNotificationPreferenceResponseInterface {
  data: NotificationPreferencesTypeUserInterface[];
}

export const toggleNotificationPreferenceAction = createAsyncThunk(
  'notification-preferences/upsertNotificationTypeUserPreference',
  async (
    request: ToggleNotificationPreferenceRequestInterface,
    thunkApi,
  ): Promise<ToggleNotificationPreferenceResponseInterface> =>
    requestGql<ToggleNotificationPreferenceResponseInterface>(request, thunkApi, 'upsertNotificationTypeUserPreference'),
);
