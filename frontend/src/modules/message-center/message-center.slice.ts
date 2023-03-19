import { createEntityAdapter, createSlice, current, EntityState, Update } from '@reduxjs/toolkit';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import { ComplexError } from 'modules/common/types';
import { fetchRecipientsAction, fetchUsersAction } from 'modules/message-center/actions';

export enum MessageCenterScreenEnum {
  CONVERSATION_SELECTED = 'conversation_selected',
  CONVERSATION_NOT_SELECTED = 'conversation_not_selected',
  CONVERSATION_ADD_MEMBERS = 'conversation_add_users',
  CONVERSATION_REMOVE_MEMBERS = 'conversation_remove_users',
  CREATE_NEW = 'create_new',
}

export enum MessageCenterConversationEditingTypeEnum {
  LIST = 'list',
  TOPBAR = 'topbar',
}

export interface MessageCenterConversationMemberInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  fullName?: string;
  initials?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageCenterMessageInterface {
  id: string;
  authorId: string;
  body: string;
  createdAt: Date;
  deletedAt: Date;
  bodyUpdatedAt: Date;
  readBy: string[];
  author: MessageCenterConversationMemberInterface;
  isAuthor: boolean;
  isUnread: boolean;
  isEditing: boolean;
  isSelected: boolean;
}

export interface MessageCenterUserGroupInterface {
  author: MessageCenterConversationMemberInterface;
  messages: MessageCenterMessageInterface[];
}

export interface MessageCenterDateGroupInterface {
  date: Date;
  groups: MessageCenterUserGroupInterface[];
}

export interface MessageCenterConversationInterface {
  id: string;
  ownerId: string;
  title?: string;
  preview: string;
  createdAt: Date;
  lastMessage?: MessageCenterMessageInterface;
  lastMessageTimestamp: Date;
  unreadCount?: number;
  memberIds?: string[];
  archived?: boolean;
  isGroup: boolean;
  isOwner: boolean;
  isNew?: boolean;
  isEditing?: boolean;
  members?: MessageCenterConversationMemberInterface[];
  owner?: MessageCenterConversationMemberInterface;
}

export interface MessageCenterUserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  initials?: string;
  avatar?: string;
  roqIdentifier?: string;
}

export interface MessageCenterUserPresenceInterface {
  id: string;
  isOnline: boolean;
}

export interface MessageCenterInfiniteListEntityStateInterface<T> extends EntityState<T> {
  error: ComplexError | null;
  isLoading: boolean;
  hasMore: boolean;
  offset: number;
  limit: number;
  totalCount: number;
  loadedTotal: number;
}

export interface MessageCenterConversationInfiniteListEntityStateInterface
  extends MessageCenterInfiniteListEntityStateInterface<MessageCenterConversationInterface> {
  editingId: string | null;
  editingType: MessageCenterConversationEditingTypeEnum | null;
  selected: MessageCenterConversationInterface | null;
  filter: string;
}

export interface MessageCenterMessageInfiniteListEntityStateInterface
  extends MessageCenterInfiniteListEntityStateInterface<MessageCenterMessageInterface> {
  active: string | null;
  filter: string;
  history: MessageCenterDateGroupInterface[];
  lastTimestamp: Date | null;
}

export interface MessageCenterUserInfiniteListEntityStateInterface
  extends MessageCenterInfiniteListEntityStateInterface<MessageCenterUserInterface> {}

export interface MessageCenterPresenceEntityStateInterface extends EntityState<MessageCenterUserPresenceInterface> {}

export interface MessageCenterRecipientsInfiniteListEntityStateInterface
  extends MessageCenterInfiniteListEntityStateInterface<MessageCenterUserInterface> {
  selectedIds: string[];
  filter: string;
  filters: {
    ids: string[];
    excludeIds: string[];
    includeIds: string[];
  };
}

export interface MessageCenterStateInterface {
  screen: MessageCenterScreenEnum;
  isOnline: boolean;
  error: ComplexError | null;
  clientId: string | null;
  unreadCount: number;
  conversations: MessageCenterConversationInfiniteListEntityStateInterface;
  messages: MessageCenterMessageInfiniteListEntityStateInterface;
  users: MessageCenterUserInfiniteListEntityStateInterface;
  recipients: MessageCenterRecipientsInfiniteListEntityStateInterface;
  presence: MessageCenterPresenceEntityStateInterface;
}

export const messageCenterConversationsAdapter = createEntityAdapter<MessageCenterConversationInterface>({
  selectId: (conversation) => conversation.id,
  sortComparer: (a, b) => +b.lastMessageTimestamp - +a.lastMessageTimestamp,
});

export const messageCenterMessagesAdapter = createEntityAdapter<MessageCenterMessageInterface>({
  selectId: (message) => message.id,
  sortComparer: (a, b) => +a.createdAt - +b.createdAt,
});

export const messageCenterUsersAdapter = createEntityAdapter<MessageCenterUserInterface>({});

export const messageCenterRecipientsAdapter = createEntityAdapter<MessageCenterUserInterface>({});

export const messageCenterPresenceAdapter = createEntityAdapter<MessageCenterUserPresenceInterface>({
  selectId: (userPresence) => userPresence.id,
});

const initialState: MessageCenterStateInterface = {
  screen: MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED,
  isOnline: false,
  error: null,
  clientId: null,
  unreadCount: 0,
  conversations: messageCenterConversationsAdapter.getInitialState({
    editingId: null,
    editingType: null,
    selected: null,
    error: null,
    isLoading: false,
    hasMore: false,
    offset: 0,
    limit: 10,
    totalCount: 0,
    loadedTotal: 0,
    filter: '',
  }),
  messages: messageCenterMessagesAdapter.getInitialState({
    active: null,
    error: null,
    isLoading: false,
    hasMore: true,
    offset: 0,
    limit: 20,
    totalCount: 0,
    loadedTotal: 0,
    filter: '',
    history: [],
    lastTimestamp: null,
  }),
  users: messageCenterUsersAdapter.getInitialState({
    error: null,
    isLoading: false,
    hasMore: true,
    offset: 0,
    limit: 20,
    totalCount: 0,
    loadedTotal: 0,
  }),
  recipients: messageCenterRecipientsAdapter.getInitialState({
    error: null,
    isLoading: false,
    hasMore: false,
    offset: 0,
    limit: 20,
    totalCount: 0,
    loadedTotal: 0,
    filter: '',
    selectedIds: [],
    filters: {
      ids: [],
      excludeIds: [],
      includeIds: [],
    },
  }),
  presence: messageCenterPresenceAdapter.getInitialState({}),
};

// @todo: if we need proper date grouping, we have to pass timezone here.
// for the moment it is decided that date grouping is not needed, but if it is we could mov normalizeMessageHistory
// functionality into SelectedConversationMessageHistory partial with useMemo instead of storing of calculated data
// in redux state (because it's hard to obtain user timezone in reducer without using additional thunks)
const groupByDate = (date: Date, dateFormat = 'MM/dd/yyyy'): string => format(startOfDay(date), dateFormat);

const groupByUser = (messages: MessageCenterMessageInterface[]): MessageCenterUserGroupInterface[] => {
  let groupIndex = -1;

  return messages.reduce((arr, currentMessage, currentIndex, orginalArray) => {
    if (currentIndex > 0) {
      const previousMessage = orginalArray[currentIndex - 1];

      if (currentMessage.authorId === previousMessage.authorId) {
        arr[groupIndex].messages = [...arr[groupIndex].messages, currentMessage];

        return arr;
      }
    }

    groupIndex++;
    return [
      ...arr,
      {
        authorId: currentMessage.authorId,
        author: currentMessage.author,
        messages: [currentMessage],
      },
    ];
  }, new Array<MessageCenterUserGroupInterface>());
};

const normalizeMessageHistory = (rawMessages: MessageCenterMessageInterface[]): MessageCenterDateGroupInterface[] => {
  const groupedByDateMessages = _groupBy(
    _map(rawMessages, (message) => ({
      ...message,
      date: groupByDate(message.createdAt),
    })),
    'date',
  );

  return _reduce(
    groupedByDateMessages,
    (arr, messages, date) => [
      ...arr,
      {
        date: new Date(date),
        groups: groupByUser(messages),
      },
    ],
    [],
  );
};

const getAllMessageEntities = (messageState: MessageCenterMessageInfiniteListEntityStateInterface) => {
  const state = current(messageState);
  return state.ids.map((id) => state.entities[id]);
};

const getConversationById = (
  conversationState: MessageCenterConversationInfiniteListEntityStateInterface,
  id: string,
) => {
  const state = current(conversationState);
  return state.entities[id];
};

const getMessageById = (messagesState: MessageCenterMessageInfiniteListEntityStateInterface, id: string) => {
  const state = current(messagesState);
  return state.entities[id];
};

const messageCenterSlice = createSlice({
  initialState,
  name: 'messageCenter',
  reducers: {
    connected: (state, action) => {
      state.isOnline = true;
      state.clientId = action.payload.clientId;
      state.error = null;
      state.unreadCount = action.payload.unreadCount;
      state.messages.hasMore = state.messages.totalCount === 0 && state.messages.loadedTotal === 0;
    },
    disconnected: (state) => {
      state.clientId = null;
      state.isOnline = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    disconnect: () => initialState,
    selectActiveConversation: (state, action) => {
      state.conversations.selected = action.payload.conversation;
      state.messages = {
        ...initialState.messages,
      };
    },
    conversationExists: (state, action) => {
      const { id, conversation } = action.payload;
      const existConversation = getConversationById(state.conversations, id);
      if (existConversation) {
        state.conversations.selected = existConversation;
      } else {
        messageCenterConversationsAdapter.addOne(state.conversations, conversation);
        state.conversations.selected = conversation;
      }
      state.messages = {
        ...initialState.messages,
      };
    },
    fetchMoreConversationsRequest: (state, action) => {
      state.conversations.error = null;
      state.conversations.isLoading = true;
      state.conversations.offset = action.payload.offset;
      state.conversations.filter = action.payload.filter || '';
    },
    fetchMoreConversationsSuccess: (state, action) => {
      const nextConversations = [].concat(action.payload.data);

      const reset = state.conversations.offset === 0;

      if (reset) {
        messageCenterConversationsAdapter.setAll(state.conversations, nextConversations);
      } else {
        messageCenterConversationsAdapter.upsertMany(state.conversations, nextConversations);
      }

      state.conversations.isLoading = false;
      state.conversations.totalCount = action.payload.totalCount;
      state.conversations.loadedTotal = state.conversations.ids.length;
      state.conversations.hasMore = state.conversations.loadedTotal < state.conversations.totalCount;
    },
    fetchMoreMessagesRequest: (state, action) => {
      state.messages.error = null;
      state.messages.isLoading = true;
      state.messages.offset = action.payload.offset;
      state.messages.filter = action.payload.filter || '';
    },
    fetchMoreMessagesSuccess: (state, action) => {
      const previousMessages = [].concat(action.payload.data);

      const reset = state.messages.offset === 0;

      if (reset) {
        messageCenterMessagesAdapter.setAll(state.messages, previousMessages);
      } else {
        messageCenterMessagesAdapter.addMany(state.messages, previousMessages);
      }

      state.messages.isLoading = false;
      state.messages.totalCount = action.payload.totalCount;
      state.messages.loadedTotal = state.messages.ids.length;
      state.messages.hasMore = state.messages.loadedTotal < state.messages.totalCount;

      const messageList = getAllMessageEntities(state.messages);
      state.messages.history = normalizeMessageHistory(messageList);

      const lastMessage = messageList[messageList.length - 1];
      state.messages.lastTimestamp = lastMessage && lastMessage.createdAt;
    },
    messageReceived: (state, action) => {
      const recipientConversation = getConversationById(state.conversations, action.payload.message.conversationId);

      if (recipientConversation) {
        const { id, unreadCount = 0 } = recipientConversation;
        const isSelectedConversationRecipient = state.conversations.selected?.id === id;

        const conversationChanges = {
          lastMessage: action.payload.message,
          lastMessageTimestamp: action.payload.message.createdAt,
          unreadCount,
        };

        if (isSelectedConversationRecipient) {
          messageCenterMessagesAdapter.addOne(state.messages, {
            ...action.payload.message,
          });

          state.messages.totalCount += 1;
          state.messages.loadedTotal += 1;

          const messageList = getAllMessageEntities(state.messages);
          state.messages.history = normalizeMessageHistory(messageList);
        }

        state.messages.lastTimestamp = action.payload.message.createdAt;
        if (action.payload.message.isUnread) {
          conversationChanges.unreadCount += 1;
          state.unreadCount += 1;
        }

        messageCenterConversationsAdapter.updateOne(state.conversations, {
          id,
          changes: conversationChanges,
        });
      } else {
        if (action.payload.message.isUnread) {
          state.unreadCount += 1;
        }
      }
    },
    messageUpdated: (state, action) => {
      const {
        message: { id, body, conversationId, bodyUpdatedAt },
      } = action.payload;
      if (conversationId !== state.conversations.selected?.id) {
        return;
      }

      messageCenterMessagesAdapter.updateOne(state.messages, {
        id,
        changes: { body, bodyUpdatedAt },
      });

      const messageList = getAllMessageEntities(state.messages);
      state.messages.history = normalizeMessageHistory(messageList);
    },
    messageDeleted: (state, action) => {
      const { id, body, deletedAt, conversationId } = action.payload;
      if (conversationId !== state.conversations.selected?.id) {
        return;
      }

      messageCenterMessagesAdapter.updateOne(state.messages, {
        id,
        changes: { body, deletedAt },
      });

      const messageList = getAllMessageEntities(state.messages);
      state.messages.history = normalizeMessageHistory(messageList);
    },
    conversationCreated: (state, action) => {
      const newConversation = { ...action.payload };

      if (!newConversation.isOwner) {
        newConversation.unreadCount = 1;
      }

      messageCenterConversationsAdapter.addOne(state.conversations, action.payload);

      state.conversations.totalCount += 1;
      state.conversations.loadedTotal += 1;

      if (newConversation.isOwner) {
        state.conversations.selected = newConversation;

        if (newConversation.lastMessage) {
          messageCenterMessagesAdapter.setAll(state.messages, [newConversation.lastMessage]);
          state.messages.loadedTotal = 1;
          state.messages.totalCount = 1;

          const messageList = getAllMessageEntities(state.messages);
          state.messages.history = normalizeMessageHistory(messageList);
          state.messages.lastTimestamp = newConversation.lastMessageTimestamp;
        }

        state.messages.error = null;
        state.messages.isLoading = false;
        state.messages.hasMore = false;
        state.messages.filter = '';

        state.screen = MessageCenterScreenEnum.CONVERSATION_SELECTED;
      }
    },
    conversationMembersChanged: (state, action) => {
      const { conversationId, memberIds, members } = action.payload;
      const isSelectedConversationRecipient = state.conversations.selected?.id === conversationId;

      messageCenterConversationsAdapter.updateOne(state.conversations, {
        id: conversationId,
        changes: {
          memberIds,
          members,
        },
      });

      if (isSelectedConversationRecipient) {
        const recipientConversation = getConversationById(state.conversations, conversationId);
        state.conversations.selected = { ...recipientConversation };
      }
    },
    conversationTitleChanged: (state, action) => {
      const { conversationId, title } = action.payload;
      const isSelectedConversationRecipient = state.conversations.selected?.id === conversationId;

      messageCenterConversationsAdapter.updateOne(state.conversations, {
        id: conversationId,
        changes: {
          title,
        },
      });

      if (isSelectedConversationRecipient) {
        const recipientConversation = getConversationById(state.conversations, conversationId);
        state.conversations.selected = { ...recipientConversation };
      }
    },
    conversationArchived: (state, action) => {
      const { conversationId } = action.payload;
      const isSelectedConversationRecipient = state.conversations.selected?.id === conversationId;

      if (isSelectedConversationRecipient) {
        state.screen = MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED;
        state.conversations.selected = null;
      }

      messageCenterConversationsAdapter.removeOne(state.conversations, conversationId);
      state.conversations.loadedTotal -= 1;
      state.conversations.totalCount -= 1;
    },
    quitConversation: (state, action) => {
      const { conversationId } = action.payload;
      const isSelectedConversationRecipient = state.conversations.selected?.id === conversationId;

      if (isSelectedConversationRecipient) {
        state.screen = MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED;
        state.conversations.selected = null;
      }

      messageCenterConversationsAdapter.removeOne(state.conversations, conversationId);
      state.conversations.loadedTotal -= 1;
      state.conversations.totalCount -= 1;
    },
    markAsReadUnreadMessagesSuccess: (state, action) => {
      const { messageIds, conversationId, userId, memberId } = action.payload;
      const isSelectedConversationRecipient = state.conversations.selected?.id === conversationId;

      if (isSelectedConversationRecipient) {
        const messageUpdates: Update<MessageCenterMessageInterface>[] = messageIds.map((id) => {
          const _message = getMessageById(state.messages, id);
          const nextReadBy = _message.readBy.concat([memberId]);

          return {
            id,
            changes: {
              isUnread: false,
              readBy: nextReadBy,
            },
          };
        });

        messageCenterMessagesAdapter.updateMany(state.messages, messageUpdates);

        const messageList = getAllMessageEntities(state.messages);
        state.messages.history = normalizeMessageHistory(messageList);

        messageCenterConversationsAdapter.updateOne(state.conversations, {
          id: action.payload.conversationId,
          changes: {
            unreadCount: 0,
          },
        });
      }

      if (userId === memberId) {
        state.unreadCount -= messageIds.length;
      }
    },
    resetUsers: (state) => {
      state.users = {
        ...initialState.users,
      };
    },
    selectUser: (state, action) => {
      state.conversations.selected = action.payload.conversation;
      state.messages = {
        ...initialState.messages,
        hasMore: false,
      };
    },
    setUsersPresence: (state, action) => {
      messageCenterPresenceAdapter.setAll(state.presence, action.payload.users);
    },
    userOnline: (state, action) => {
      const { id, isOnline } = action.payload;
      const userPresenceChanges = { isOnline };
      messageCenterPresenceAdapter.updateOne(state.presence, { id, changes: userPresenceChanges });
    },
    userOffline: (state, action) => {
      const { id, isOnline } = action.payload;
      const userPresenceChanges = { isOnline };
      messageCenterPresenceAdapter.updateOne(state.presence, { id, changes: userPresenceChanges });
    },
    toggleRecipient: (state, action) => {
      const id = action.payload;
      const isSelected = state.recipients.selectedIds.includes(id);

      state.recipients.selectedIds = isSelected
        ? state.recipients.selectedIds.filter((recipientId) => recipientId !== id)
        : [...state.recipients.selectedIds, id];
    },
    setSelectedRecipients: (state, action) => {
      state.recipients.selectedIds = action.payload;
    },
    clearRecipients: (state) => {
      state.recipients = {
        ...initialState.recipients,
      };
    },
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    fetchRecipientsRequest: (state, action) => {
      const { offset, text, ids, excludeIds, includeIds } = action.payload;
      if (offset === 0) {
        messageCenterRecipientsAdapter.setAll(state.recipients, []);
      }

      state.recipients.error = null;
      state.recipients.isLoading = true;
      state.recipients.offset = offset;
      state.recipients.filter = text || '';
      state.recipients.filters.ids = ids;
      state.recipients.filters.excludeIds = excludeIds;
      state.recipients.filters.includeIds = includeIds;
    },
    setSelectedMessage: (state, action) => {
      const { id, isSelected } = action.payload;

      messageCenterMessagesAdapter.updateOne(state.messages, {
        id,
        changes: {
          isSelected,
        },
      });
    },
    setEditingMessage: (state, action) => {
      const { id, isEditing } = action.payload;

      messageCenterMessagesAdapter.updateOne(state.messages, {
        id,
        changes: {
          isEditing,
        },
      });

      state.messages.active = isEditing ? id : null;
    },
    setEditingConversation: (state, action) => {
      const { id, isEditing, type: editingType } = action.payload;

      messageCenterConversationsAdapter.updateOne(state.conversations, {
        id,
        changes: {
          isEditing,
        },
      });

      const isSelectedConversation = state.conversations.selected?.id === id;
      if (isSelectedConversation) {
        state.conversations.selected.isEditing = isEditing;
      }

      state.conversations.editingId = isEditing ? id : null;
      state.conversations.editingType = isEditing ? editingType : null;
    },
  },
  extraReducers: {
    [fetchUsersAction.pending.type]: (state) => {
      state.users.error = null;
      state.users.isLoading = true;
    },
    [fetchUsersAction.fulfilled.type]: (state, action) => {
      messageCenterUsersAdapter.setAll(state.users, action.payload.data);
      state.users.isLoading = false;
      state.users.totalCount = state.users.ids.length;
      state.users.loadedTotal = state.users.ids.length;
      state.users.hasMore = false;
    },
    [fetchUsersAction.rejected.type]: (state, { payload }) => {
      state.users.error = payload;
      state.users.isLoading = false;
    },
    [fetchRecipientsAction.pending.type]: (state) => {
      state.recipients.isLoading = false;
    },
    [fetchRecipientsAction.fulfilled.type]: (state, { payload: { data, totalCount } }) => {
      messageCenterRecipientsAdapter.addMany(state.recipients, data);
      state.recipients.error = null;
      state.recipients.isLoading = false;
      state.recipients.totalCount = totalCount;
      state.recipients.loadedTotal = state.recipients.ids.length;
      state.recipients.hasMore = state.recipients.loadedTotal < state.recipients.totalCount;
    },
    [fetchRecipientsAction.rejected.type]: (state, { payload }) => {
      state.recipients.isLoading = false;
      state.recipients.error = payload;
    },
  },
});

export default messageCenterSlice.reducer;

export const {
  connected,
  disconnect,
  disconnected,
  setError,
  selectActiveConversation,
  conversationExists,
  messageReceived,
  messageUpdated,
  messageDeleted,
  fetchMoreConversationsRequest,
  fetchMoreConversationsSuccess,
  fetchMoreMessagesRequest,
  fetchMoreMessagesSuccess,
  conversationCreated,
  conversationMembersChanged,
  conversationTitleChanged,
  conversationArchived,
  quitConversation,
  markAsReadUnreadMessagesSuccess,
  resetUsers,
  selectUser,
  setUsersPresence,
  userOnline,
  userOffline,
  toggleRecipient,
  setSelectedRecipients,
  clearRecipients,
  setScreen,
  fetchRecipientsRequest,
  setSelectedMessage,
  setEditingMessage,
  setEditingConversation,
} = messageCenterSlice.actions;

export { fetchUsersAction, fetchRecipientsAction };
