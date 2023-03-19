import { MessageCenterConversationInterface } from 'modules/message-center/message-center.slice';
import { messageSchema } from 'modules/message-center/schemas/message.schema';

interface ConversationExtraFieldsInterface {
  userId: string;
}

export const conversationSchema = (
  conversation: MessageCenterConversationInterface,
  extraFields: ConversationExtraFieldsInterface,
): MessageCenterConversationInterface => ({
  ...conversation,
  createdAt: new Date(conversation.createdAt),
  isOwner: conversation.ownerId === extraFields.userId,
  lastMessageTimestamp: new Date(conversation.lastMessageTimestamp),
  lastMessage: conversation.lastMessage && messageSchema(conversation.lastMessage, extraFields),
});
