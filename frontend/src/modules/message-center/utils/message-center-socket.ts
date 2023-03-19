/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import { SocketClientInterface } from 'configuration/socket/socket-client';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import {
  MessageCenterConversationInterface,
  MessageCenterConversationMemberInterface,
  MessageCenterMessageInterface,
  MessageCenterUserPresenceInterface,
} from 'modules/message-center/message-center.slice';

export enum MessageCenterSocketRequestMessageEnum {
  USER_CONNECTED = 'userConnected',
  USER_LIST = 'userList',
  CONVERSATION_LIST = 'conversationList',
  CONVERSATION_DETAILS = 'conversationDetails',
  CREATE_CONVERSATION = 'createConversation',
  MESSAGE_LIST = 'messageList',
  SEND_MESSAGE = 'sendMessage',
  MARK_AS_READ_UNREAD_MESSAGES = 'markAsReadUnreadMessages',
  EDIT_MESSAGE = 'editMessage',
  DELETE_MESSAGE = 'deleteMessage',
  UPDATE_CONVERSATION_MEMBERS = 'updateConversationMembers',
  LEAVE_CONVERSATION = 'leaveConversation',
  RENAME_CONVERSATION = 'renameConversation',
  ARCHIVE_CONVERSATION = 'archiveConversation',
}

export enum MessageCenterSocketResponseMessageEnum {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  CONVERSATION_CREATED = 'conversationCreated',
  CONVERSATION_MEMBERS_CHANGED = 'conversationMembersChanged',
  CONVERSATION_TITLE_CHANGED = 'conversationTitleChanged',
  CONVERSATION_EXISTS = 'conversationExists',
  CONVERSATION_ARCHIVED = 'conversationArchived',
  MESSAGE_RECEIVED = 'messageReceived',
  MESSAGE_UPDATED = 'messageUpdated',
  MESSAGE_DELETED = 'messageDeleted',
  MESSAGES_READ = 'messagesRead',
  MEMBER_QUIT_CONVERSATION = 'memberQuitConversation',
  USER_ONLINE = 'userOnline',
  USER_OFFLINE = 'userOffline',
  EXCEPTION = 'exception'
}

export interface ConversationCreatedResponsePayloadInterface extends MessageCenterConversationInterface {}

export interface ConversationMembersChangedResponsePayloadInterface {
  conversationId: string;
  memberIds: string[];
  members: MessageCenterConversationMemberInterface[];
}

export interface ConversationTitleChangedResponsePayloadInterface {
  conversationId: string;
  title: string;
}

export interface ConversationExistsResponsePayloadInterface {
  id: string;
  conversation: MessageCenterConversationInterface;
}

export interface ConverstionArchivedResponsePayloadInterface {
  conversationId: string;
}

export interface MessageRecieivedResponsePayloadInterface extends MessageCenterMessageInterface {}

export interface MessageUpdatedResponsePayloadInterface extends MessageCenterMessageInterface {}

export interface MessageDeletedResponsePayloadInterface {
  id: string;
  conversationId: string;
  deletedAt: Date;
  body: string;
}

export interface MessagesReadResponsePayloadInterface {
  messageIds: string[];
  conversationId: string;
  memberId: string;
}

export interface MemberQuitConversationResponsePayloadInterface {
  conversationId: string;
  memberIds: string[];
}

export interface UserOnlineResponsePayloadInterface {
  id: string;
  isOnline: boolean;
}

export interface UserOfflineResponsePayloadInterface {
  id: string;
  isOnline: boolean;
}

export interface UserConnectedRequestPayload {
  userId: string;
}

export interface UserConnectedResponsePayload {
  unreadCount: number;
}

export interface ArchiveConversationRequestPayloadInterface {
  conversationId: string;
}

export interface UserListRequestPayloadInterface {
  userId: string;
}

export interface UserListResponsePayloadInterface {
  users: MessageCenterUserPresenceInterface[];
}

export interface CreateConversationRequestPayloadInterface {
  title: string;
  memberIds: string[];
  firstMessage?: string;
  mentionedIds?: string[];
}

export interface ConversationListRequestPayloadInterface {
  limit: number;
  offset: number;
  filter: string;
  includeArchived: boolean;
}

export interface ConversationListResponsePayloadInterface {
  data: MessageCenterConversationInterface[];
  totalCount: number;
}

export interface ConversationDetailsRequestPayloadInterface {
  conversationId: string;
}

export interface ConversationDetailsResponsePayloadInterface {
  conversation: MessageCenterConversationInterface;
}

export interface SendMessageRequestPayloadInterface {
  conversationId: string;
  body: string;
  mentionedIds?: string[];
}

export interface RenameConversationRequestPayloadInterface {
  conversationId: string;
  title: string;
}

export interface LeaveConversationRequestPayloadInterface {
  conversationId: string;
}

export interface MessageDeleteRequestPayloadInterface {
  id: string;
}

export interface MessageEditRequestPayloadInterface extends Omit<SendMessageRequestPayloadInterface, 'conversationId'> {
  id: string;
}

export interface UpdateConversationMembersRequestPayloadInterface {
  conversationId: string;
  memberIds: string[];
}

export interface MarkAsReadUnreadMessagesRequestPayloadInterface {
  conversationId: string;
  lastTimestamp: Date;
}

export interface FetchMessagesRequestPayloadInterface extends PaginationInterface {
  conversationId: string;
}

export interface FetchMoreMessagesResponsePayloadInterface {
  data: MessageCenterMessageInterface[];
  totalCount: number;
}

type MessageCenterSocketRequestPayload =
  | ArchiveConversationRequestPayloadInterface
  | UserListRequestPayloadInterface
  | CreateConversationRequestPayloadInterface
  | ConversationListRequestPayloadInterface
  | ConversationDetailsRequestPayloadInterface
  | SendMessageRequestPayloadInterface
  | RenameConversationRequestPayloadInterface
  | LeaveConversationRequestPayloadInterface
  | MessageDeleteRequestPayloadInterface
  | UpdateConversationMembersRequestPayloadInterface
  | MarkAsReadUnreadMessagesRequestPayloadInterface;

type MessageCenterSocketResponsePayload =
  | ConversationCreatedResponsePayloadInterface
  | ConversationMembersChangedResponsePayloadInterface
  | ConversationTitleChangedResponsePayloadInterface
  | ConversationExistsResponsePayloadInterface
  | ConverstionArchivedResponsePayloadInterface
  | MessageRecieivedResponsePayloadInterface
  | MessageUpdatedResponsePayloadInterface
  | MessageDeletedResponsePayloadInterface
  | MessagesReadResponsePayloadInterface
  | MemberQuitConversationResponsePayloadInterface
  | UserOnlineResponsePayloadInterface
  | UserOfflineResponsePayloadInterface
  | UserListResponsePayloadInterface
  | ConversationDetailsResponsePayloadInterface
  | FetchMoreMessagesResponsePayloadInterface
  | ConversationListResponsePayloadInterface
  | UserConnectedResponsePayload;

type SocketResponeHanlder<T = MessageCenterSocketResponsePayload | Error> = (payload?: T | Error) => void;

export interface MessageCenterSocketInterface {
  getId: () => string | null;
  setPlatformToken: (platformToken: string) => void;
  isConnected: () => boolean;
  connect: () => void;
  disconnect: () => void;
  onConnect: (clb: SocketResponeHanlder) => void;
  onDisconnect: (clb: SocketResponeHanlder) => void;
  onError: (clb: SocketResponeHanlder<Error>) => void;
  onServerException: (clb: SocketResponeHanlder<Error>) => void;
  offConnect: (clb: SocketResponeHanlder) => void;
  offDisconnect: (clb: SocketResponeHanlder) => void;
  offError: (clb: SocketResponeHanlder<Error>) => void;
  offServerException: (clb: SocketResponeHanlder<Error>) => void;
  onConversationCreated: (clb: SocketResponeHanlder<ConversationCreatedResponsePayloadInterface>) => void;
  offConversationCreated: (clb: SocketResponeHanlder<ConversationCreatedResponsePayloadInterface>) => void;
  onConversationMembersChanged: (clb: SocketResponeHanlder<ConversationMembersChangedResponsePayloadInterface>) => void;
  offConversationMembersChanged: (
    clb: SocketResponeHanlder<ConversationMembersChangedResponsePayloadInterface>,
  ) => void;
  onConversationTitleChanged: (clb: SocketResponeHanlder<ConversationTitleChangedResponsePayloadInterface>) => void;
  offConversationTitleChanged: (clb: SocketResponeHanlder<ConversationTitleChangedResponsePayloadInterface>) => void;
  onConversationExists: (clb: SocketResponeHanlder<ConversationExistsResponsePayloadInterface>) => void;
  offConversationExists: (clb: SocketResponeHanlder<ConversationExistsResponsePayloadInterface>) => void;
  onConversationArchived: (clb: SocketResponeHanlder<ConverstionArchivedResponsePayloadInterface>) => void;
  offConversationArchived: (clb: SocketResponeHanlder<ConverstionArchivedResponsePayloadInterface>) => void;
  onMessageRecieived: (clb: SocketResponeHanlder<MessageRecieivedResponsePayloadInterface>) => void;
  offMessageRecieived: (clb: SocketResponeHanlder<MessageRecieivedResponsePayloadInterface>) => void;
  onMessageUpdated: (clb: SocketResponeHanlder<MessageUpdatedResponsePayloadInterface>) => void;
  offMessageUpdated: (clb: SocketResponeHanlder<MessageUpdatedResponsePayloadInterface>) => void;
  onMessageDeleted: (clb: SocketResponeHanlder<MessageDeletedResponsePayloadInterface>) => void;
  offMessageDeleted: (clb: SocketResponeHanlder<MessageDeletedResponsePayloadInterface>) => void;
  onMessagesRead: (clb: SocketResponeHanlder<MessagesReadResponsePayloadInterface>) => void;
  offMessagesRead: (clb: SocketResponeHanlder<MessagesReadResponsePayloadInterface>) => void;
  onMemberQuitConversation: (clb: SocketResponeHanlder<MemberQuitConversationResponsePayloadInterface>) => void;
  offMemberQuitConversation: (clb: SocketResponeHanlder<MemberQuitConversationResponsePayloadInterface>) => void;
  onUserOnline: (clb: SocketResponeHanlder<UserOnlineResponsePayloadInterface>) => void;
  offUserOnline: (clb: SocketResponeHanlder<UserOnlineResponsePayloadInterface>) => void;
  onUserOffline: (clb: SocketResponeHanlder<UserOfflineResponsePayloadInterface>) => void;
  offUserOffline: (clb: SocketResponeHanlder<UserOfflineResponsePayloadInterface>) => void;
  authorize: (payload: UserConnectedRequestPayload, clb?: SocketResponeHanlder<UserConnectedResponsePayload>) => void;
  userList: (
    payload: UserListRequestPayloadInterface,
    clb?: SocketResponeHanlder<UserListResponsePayloadInterface>,
  ) => void;
  createConversation: (payload: CreateConversationRequestPayloadInterface) => void;
  conversationList: (
    payload: ConversationListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ConversationListResponsePayloadInterface>,
  ) => void;
  conversationDetails: (
    conversationId: string,
    clb?: SocketResponeHanlder<ConversationDetailsResponsePayloadInterface>,
  ) => void;
  archiveConversation: (conversationId: string) => void;
  renameConversation: (payload: RenameConversationRequestPayloadInterface) => void;
  leaveConversation: (conversationId: string) => void;
  updateConversationMembers: (payload: UpdateConversationMembersRequestPayloadInterface) => void;
  messageList: (
    payload: FetchMessagesRequestPayloadInterface,
    clb?: SocketResponeHanlder<FetchMoreMessagesResponsePayloadInterface>,
  ) => void;
  markAsReadUnreadMessages: (payload: MarkAsReadUnreadMessagesRequestPayloadInterface) => void;
  sendMessage: (payload: SendMessageRequestPayloadInterface) => void;
  editMessage: (payload: MessageEditRequestPayloadInterface) => void;
  deleteMessage: (messageId: string) => void;
}

export class MessageCenterSocket implements MessageCenterSocketInterface {
  constructor(private socket: SocketClientInterface) {
    this.socket = socket;
  }

  private listen(event: MessageCenterSocketResponseMessageEnum, clb?: SocketResponeHanlder) {
    this.socket.on(event, clb);
  }

  public removeListener(event: MessageCenterSocketResponseMessageEnum, clb?: SocketResponeHanlder) {
    this.socket.off(event, clb);
  }

  private request(
    requestType: MessageCenterSocketRequestMessageEnum,
    payload: MessageCenterSocketRequestPayload,
    clb?: SocketResponeHanlder,
  ) {
    if (clb) {
      return this.socket.emit(requestType, payload, clb);
    }

    return this.socket.emit(requestType, payload);
  }

  getId() {
    return this.socket?.id;
  }

  connect(): void {
    this.socket?.connect();
  }

  disconnect(): void {
    this.socket?.disconnectAndRemoveFromCache();
  }

  isConnected(): boolean {
    return this.socket?.connected;
  }

  setPlatformToken(platformToken: string) {
    this.socket.setPlatformToken(platformToken);
  }

  onConnect(clb: SocketResponeHanlder) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONNECT, clb);
  }

  onDisconnect(clb: SocketResponeHanlder) {
    return this.listen(MessageCenterSocketResponseMessageEnum.DISCONNECT, clb);
  }

  onError(clb: SocketResponeHanlder<Error>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONNECT_ERROR, clb);
  }

  onServerException(clb: SocketResponeHanlder<Error>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.EXCEPTION, clb);
  }

  offConnect(clb: SocketResponeHanlder) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONNECT, clb);
  }

  offDisconnect(clb: SocketResponeHanlder) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.DISCONNECT, clb);
  }

  offError(clb: SocketResponeHanlder<Error>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONNECT_ERROR, clb);
  }

  offServerException(clb: SocketResponeHanlder<Error>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.EXCEPTION, clb);
  }

  onConversationCreated(clb: SocketResponeHanlder<ConversationCreatedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONVERSATION_CREATED, clb);
  }

  offConversationCreated(clb: SocketResponeHanlder<ConversationCreatedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONVERSATION_CREATED, clb);
  }

  onConversationMembersChanged(clb: SocketResponeHanlder<ConversationMembersChangedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONVERSATION_MEMBERS_CHANGED, clb);
  }

  offConversationMembersChanged(clb: SocketResponeHanlder<ConversationMembersChangedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONVERSATION_MEMBERS_CHANGED, clb);
  }

  onConversationTitleChanged(clb: SocketResponeHanlder<ConversationTitleChangedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONVERSATION_TITLE_CHANGED, clb);
  }

  offConversationTitleChanged(clb: SocketResponeHanlder<ConversationTitleChangedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONVERSATION_TITLE_CHANGED, clb);
  }

  onConversationExists(clb: SocketResponeHanlder<ConversationExistsResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONVERSATION_EXISTS, clb);
  }

  offConversationExists(clb: SocketResponeHanlder<ConversationExistsResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONVERSATION_EXISTS, clb);
  }

  onConversationArchived(clb: SocketResponeHanlder<ConverstionArchivedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.CONVERSATION_ARCHIVED, clb);
  }

  offConversationArchived(clb: SocketResponeHanlder<ConverstionArchivedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.CONVERSATION_ARCHIVED, clb);
  }

  onMessageRecieived(clb: SocketResponeHanlder<MessageRecieivedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.MESSAGE_RECEIVED, clb);
  }

  offMessageRecieived(clb: SocketResponeHanlder<MessageRecieivedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.MESSAGE_RECEIVED, clb);
  }

  onMessageUpdated(clb: SocketResponeHanlder<MessageUpdatedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.MESSAGE_UPDATED, clb);
  }

  offMessageUpdated(clb: SocketResponeHanlder<MessageUpdatedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.MESSAGE_UPDATED, clb);
  }

  onMessageDeleted(clb: SocketResponeHanlder<MessageDeletedResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.MESSAGE_DELETED, clb);
  }

  offMessageDeleted(clb: SocketResponeHanlder<MessageDeletedResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.MESSAGE_DELETED, clb);
  }

  onMessagesRead(clb: SocketResponeHanlder<MessagesReadResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.MESSAGES_READ, clb);
  }

  offMessagesRead(clb: SocketResponeHanlder<MessagesReadResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.MESSAGES_READ, clb);
  }

  onMemberQuitConversation(clb: SocketResponeHanlder<MemberQuitConversationResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.MEMBER_QUIT_CONVERSATION, clb);
  }

  offMemberQuitConversation(clb: SocketResponeHanlder<MemberQuitConversationResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.MEMBER_QUIT_CONVERSATION, clb);
  }

  onUserOnline(clb: SocketResponeHanlder<UserOnlineResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.USER_ONLINE, clb);
  }

  offUserOnline(clb: SocketResponeHanlder<UserOnlineResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.USER_ONLINE, clb);
  }

  onUserOffline(clb: SocketResponeHanlder<UserOfflineResponsePayloadInterface>) {
    return this.listen(MessageCenterSocketResponseMessageEnum.USER_OFFLINE, clb);
  }

  offUserOffline(clb: SocketResponeHanlder<UserOfflineResponsePayloadInterface>) {
    return this.removeListener(MessageCenterSocketResponseMessageEnum.USER_OFFLINE, clb);
  }

  authorize(payload: UserConnectedRequestPayload, clb?: SocketResponeHanlder<UserConnectedResponsePayload>) {
    this.request(MessageCenterSocketRequestMessageEnum.USER_CONNECTED, payload, clb);
  }

  userList(payload: UserListRequestPayloadInterface, clb?: SocketResponeHanlder<UserListResponsePayloadInterface>) {
    this.request(MessageCenterSocketRequestMessageEnum.USER_LIST, payload, clb);
  }

  createConversation(payload: CreateConversationRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.CREATE_CONVERSATION, payload);
  }

  conversationList(
    payload: ConversationListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ConversationListResponsePayloadInterface>,
  ) {
    this.request(MessageCenterSocketRequestMessageEnum.CONVERSATION_LIST, payload, clb);
  }

  conversationDetails(conversationId: string, clb?: SocketResponeHanlder<ConversationDetailsResponsePayloadInterface>) {
    const payload: ConversationDetailsRequestPayloadInterface = { conversationId };
    this.request(MessageCenterSocketRequestMessageEnum.CONVERSATION_DETAILS, payload, clb);
  }

  archiveConversation(conversationId: string) {
    const payload: ArchiveConversationRequestPayloadInterface = { conversationId };
    this.request(MessageCenterSocketRequestMessageEnum.ARCHIVE_CONVERSATION, payload);
  }

  renameConversation(payload: RenameConversationRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.RENAME_CONVERSATION, payload);
  }

  leaveConversation(conversationId: string) {
    const payload: LeaveConversationRequestPayloadInterface = { conversationId };
    this.request(MessageCenterSocketRequestMessageEnum.LEAVE_CONVERSATION, payload);
  }

  updateConversationMembers(payload: UpdateConversationMembersRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.UPDATE_CONVERSATION_MEMBERS, payload);
  }

  messageList(
    payload: FetchMessagesRequestPayloadInterface,
    clb?: SocketResponeHanlder<FetchMoreMessagesResponsePayloadInterface>,
  ) {
    this.request(MessageCenterSocketRequestMessageEnum.MESSAGE_LIST, payload, clb);
  }

  markAsReadUnreadMessages(payload: MarkAsReadUnreadMessagesRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.MARK_AS_READ_UNREAD_MESSAGES, payload);
  }

  sendMessage(payload: SendMessageRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.SEND_MESSAGE, payload);
  }

  editMessage(payload: MessageEditRequestPayloadInterface) {
    this.request(MessageCenterSocketRequestMessageEnum.EDIT_MESSAGE, payload);
  }

  deleteMessage(messageId: string) {
    const paylaod: MessageDeleteRequestPayloadInterface = { id: messageId };
    this.request(MessageCenterSocketRequestMessageEnum.DELETE_MESSAGE, paylaod);
  }
}
