import { createSlice, current } from '@reduxjs/toolkit';
import { fetchCategoriesAction, toggleNotificationPreferenceAction } from 'modules/notification-preferences/actions';

export interface NotificationPreferencesTypeUserInterface {
  id: string;
  key: string;
  web: boolean;
  mail: boolean;
  userId: string;
}

export interface NotificationPreferencesTypeInterface {
  id: string;
  key: string;
  description: string;
  defaultUserActiveWeb: boolean;
  defaultUserActiveMail: boolean;
  userPreference?: NotificationPreferencesTypeUserInterface;
}

export interface NotificationPreferencesTypeCategoryInterface {
  id: string;
  key: string;
  description: string;
  notificationTypes?: NotificationPreferencesTypeInterface[];
}

export interface NotificationPreferencesStateInterface {
  isPreferenceLoading: boolean;
  success: boolean;
  categories: NotificationPreferencesTypeCategoryInterface[];
}

const initialState: NotificationPreferencesStateInterface = {
  isPreferenceLoading: true,
  success: false,
  categories: [],
};

const processCategoriesReducer = (state = initialState) => {
  state.isPreferenceLoading = true;
};

const errorCategoriesReducer = (state = initialState) => {
  state.isPreferenceLoading = false;
};

const successCategoriesReducer = (state = initialState, { payload: { data } }) => {
  state.isPreferenceLoading = false;
  const categories = data.map((category) => {
    const { data: dataNotificationTypes } = category.notificationTypes;
    const notificationTypes = dataNotificationTypes.map((_notificationType) => {
      const { notificationTypeUserPreferences, ...notificationType } = _notificationType;
      return { ...notificationType, userPreference: notificationTypeUserPreferences.data?.[0] };
    });
    return {
      ...category,
      notificationTypes,
    };
  });
  state.categories = categories;
};

const successUpdatePreferenceReducer = (state = initialState, { payload }) => {
  const categories = current(state.categories).map((category) => ({
    ...category,
    notificationTypes: category.notificationTypes.map((_type) => {
      if (_type.id === payload.notificationTypeId) {
        return {
          ..._type,
          userPreference: payload,
        };
      }
      return _type;
    }),
  }));

  state.categories = categories;
  state.success = true;
};

export const notificationPreferencesSlice = createSlice({
  name: 'notificationPreferences',
  initialState,
  reducers: {
    setUpdatePreferenceSuccessAction: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: {
    [fetchCategoriesAction.pending.type]: processCategoriesReducer,
    [fetchCategoriesAction.rejected.type]: errorCategoriesReducer,
    [fetchCategoriesAction.fulfilled.type]: successCategoriesReducer,
    [toggleNotificationPreferenceAction.fulfilled.type]: successUpdatePreferenceReducer,
  },
});

const { setUpdatePreferenceSuccessAction } = notificationPreferencesSlice.actions;

export default notificationPreferencesSlice.reducer;
export { fetchCategoriesAction, toggleNotificationPreferenceAction, setUpdatePreferenceSuccessAction };
