import { MessageCenterMessageInterface } from 'modules/message-center/message-center.slice';

interface MessageExtraFieldsInterface {
  userId: string;
}

export const messageSchema = (
  message: MessageCenterMessageInterface,
  extraFields: MessageExtraFieldsInterface,
): MessageCenterMessageInterface => ({
  ...message,
  createdAt: new Date(message.createdAt),
  deletedAt: message.deletedAt && new Date(message.deletedAt),
  bodyUpdatedAt: message.bodyUpdatedAt && new Date(message.bodyUpdatedAt),
  isAuthor: message.authorId === extraFields.userId,
  isUnread: message.readBy.indexOf(extraFields.userId) === -1,
});
