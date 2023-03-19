import { ApolloError } from '@apollo/client';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotificationsAction,
  fetchNotificationsNextPageAction,
  fetchNotificationsToggleAction,
  readAllNotificationsAction,
  readNotificationAction,
  unreadNotificationAction,
} from 'modules/notifications/actions';

export interface NotificationsInterface {
  id: string;
  icon: string;
  title: string;
  content: string;
  link?: string;
  createdAt: Date;
  read?: boolean;
  totalCount?: number;
}

export interface NotificationsErrorInterface extends ApolloError {}
export interface NotificationsStateInterface {
  isNotificationsLoading: boolean;
  isToggleLoading: boolean;
  notificationsError: NotificationsErrorInterface | null;
  notifications: NotificationsInterface[];
  sidebar: boolean;
  unreadCount: number;
  unreadToggle: boolean;
  totalCount: number;
}

const initialState: NotificationsStateInterface = {
  isNotificationsLoading: false,
  isToggleLoading: false,
  notificationsError: null,
  notifications: [],
  sidebar: false,
  unreadCount: 0,
  unreadToggle: false,
  totalCount: 0,
};

const processNotificationsReducer = (state = initialState) => {
  state.isNotificationsLoading = true;
};

const processToggleNotificationsReducer = (state = initialState) => {
  state.isNotificationsLoading = true;
  state.isToggleLoading = true;
};

const errorNotificationsReducer = (state = initialState, action) => {
  state.isNotificationsLoading = false;
  state.notificationsError = action.payload;
};
const errorToggleNotificationsReducer = (state = initialState, action) => {
  state.isNotificationsLoading = false;
  state.isToggleLoading = false;
  state.notificationsError = action.payload;
};

const transformNotifications = (notifications) =>
  notifications.map((item) => ({
    ...item,
    read: item.read || false,
    createdAt: new Date(item.createdAt),
  }));

const successNotificationsReducer = (state = initialState, { payload }) => {
  const { loadNotifications, loadUnreadNotificationCount } = payload;
  const { data, totalCount } = loadNotifications;
  state.isNotificationsLoading = false;
  state.notificationsError = null;
  const newNotifications = transformNotifications(data);
  state.notifications = [...newNotifications, ...state.notifications];
  state.totalCount += totalCount;
  state.unreadCount = loadUnreadNotificationCount.totalCount;
};
const successNotificationsToggleReducer = (state = initialState, { payload }) => {
  const { loadNotifications, loadUnreadNotificationCount } = payload;
  const { data, totalCount } = loadNotifications;
  state.isNotificationsLoading = false;
  state.isToggleLoading = false;
  state.notificationsError = null;
  state.notifications = transformNotifications(data);
  state.totalCount = totalCount;
  state.unreadCount = loadUnreadNotificationCount.totalCount;
  state.unreadToggle = !state.unreadToggle;
};

const successNotificationsNextPageReducer = (state = initialState, { payload: { data } }) => {
  state.isNotificationsLoading = false;
  state.notificationsError = null;
  const oldNotifications = transformNotifications(data);
  state.notifications = [...state.notifications, ...oldNotifications];
};

const successReadAllNotificationsReducer = (state = initialState, { payload }) => {
  if (payload) {
    state.notifications.forEach((item) => {
      item.read = true;
    });
    state.unreadCount = 0;
  }
};

const errorReadAllNotificationsReducer = (state = initialState, action) => {
  state.notificationsError = action.payload;
};

const markReadReducer = (state = initialState, { payload }) => {
  const { id, read } = payload || {};
  if (read === null || typeof read === 'undefined') {
    return;
  }
  const notification = state.notifications.find((item) => item.id === id);
  if (!notification.read && read) {
    --state.unreadCount;
  } else if (notification.read && !read) {
    ++state.unreadCount;
  }
  notification.read = read;
};

const errorMarkReadReducer = (state = initialState, action) => {
  state.notificationsError = action.payload;
};

const errorMarkUnReadReducer = (state = initialState, action) => {
  state.notificationsError = action.payload;
};
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotificationsSidebarAction: (state) => {
      state.sidebar = !state.sidebar;
    },
    closeNotificationsSidebarAction: (state) => {
      state.sidebar = false;
    },
    setNotificationsSidebarAction: (state, action) => {
      state.sidebar = action.payload;
    },
  },
  extraReducers: {
    [fetchNotificationsAction.pending.type]: processNotificationsReducer,
    [fetchNotificationsAction.rejected.type]: errorNotificationsReducer,
    [fetchNotificationsAction.fulfilled.type]: successNotificationsReducer,
    [fetchNotificationsToggleAction.pending.type]: processToggleNotificationsReducer,
    [fetchNotificationsToggleAction.rejected.type]: errorToggleNotificationsReducer,
    [fetchNotificationsToggleAction.fulfilled.type]: successNotificationsToggleReducer,
    [fetchNotificationsNextPageAction.fulfilled.type]: successNotificationsNextPageReducer,
    [fetchNotificationsNextPageAction.pending.type]: processNotificationsReducer,
    [fetchNotificationsNextPageAction.rejected.type]: errorNotificationsReducer,
    [readNotificationAction.fulfilled.type]: markReadReducer,
    [readNotificationAction.rejected.type]: errorMarkReadReducer,
    [unreadNotificationAction.fulfilled.type]: markReadReducer,
    [unreadNotificationAction.rejected.type]: errorMarkUnReadReducer,
    [readAllNotificationsAction.fulfilled.type]: successReadAllNotificationsReducer,
    [readAllNotificationsAction.rejected.type]: errorReadAllNotificationsReducer,
  },
});

export default notificationsSlice.reducer;
export const { toggleNotificationsSidebarAction, closeNotificationsSidebarAction, setNotificationsSidebarAction } =
  notificationsSlice.actions;

export {
  fetchNotificationsAction,
  fetchNotificationsNextPageAction,
  readNotificationAction,
  unreadNotificationAction,
  readAllNotificationsAction,
  fetchNotificationsToggleAction,
};
