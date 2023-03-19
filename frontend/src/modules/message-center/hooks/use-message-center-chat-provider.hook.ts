import {
  conversationArchived,
  conversationCreated,
  conversationExists,
  conversationMembersChanged,
  conversationTitleChanged,
  markAsReadUnreadMessagesSuccess,
  MessageCenterMessageInterface,
  MessageCenterScreenEnum,
  messageDeleted,
  messageUpdated,
  quitConversation,
  setUsersPresence,
  userOffline,
  userOnline
} from 'modules/message-center';
import { useFetchMessages, useMessageCenter, useMessageCenterScreen, useMessageCenterSocket } from 'modules/message-center/hooks';
import { useMessageCenterChatRouter } from 'modules/message-center/hooks/use-message-center-chat-router.hook';
import { conversationSchema, messageSchema } from 'modules/message-center/schemas';
import {
  ConversationCreatedResponsePayloadInterface,
  ConversationExistsResponsePayloadInterface,
  ConversationMembersChangedResponsePayloadInterface,
  ConversationTitleChangedResponsePayloadInterface,
  ConverstionArchivedResponsePayloadInterface,
  MemberQuitConversationResponsePayloadInterface,
  MessageDeletedResponsePayloadInterface,
  MessagesReadResponsePayloadInterface,
  UserListRequestPayloadInterface,
  UserListResponsePayloadInterface,
  UserOfflineResponsePayloadInterface,
  UserOnlineResponsePayloadInterface
} from 'modules/message-center/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useMessageCenterChatProvider = (userId: string): void => {
  const { isOnline, clientId } = useMessageCenter();

  const dispatch = useDispatch();

  const [socket] = useMessageCenterSocket();
  const messageRouter = useMessageCenterChatRouter();
  const { initialFetch } = useFetchMessages();
  const { set: setNextScreen } = useMessageCenterScreen();

  useEffect(() => {
    if (socket) {
      socket.onConversationCreated(handleConversationCreated);
      socket.onConversationExists(handleConversationExists);
      socket.onConversationMembersChanged(handleConversationMembersChanged);
      socket.onConversationTitleChanged(handleConversationTitleChanged);
      socket.onConversationArchived(handleConversationArchived);
      socket.onMemberQuitConversation(handleMemberQuitConversation);
      socket.onMessageUpdated(handleMessageUpdated);
      socket.onMessageDeleted(handleMessageDeleted);
      socket.onUserOnline(handleUserOnline);
      socket.onUserOffline(handleUserOffline);
      socket.onMessagesRead(handleMessagesRead);

      return () => {
        socket.offConversationCreated(handleConversationCreated);
        socket.offConversationExists(handleConversationExists);
        socket.offConversationMembersChanged(handleConversationMembersChanged);
        socket.offConversationTitleChanged(handleConversationTitleChanged);
        socket.offConversationArchived(handleConversationArchived);
        socket.offMemberQuitConversation(handleMemberQuitConversation);
        socket.offMessageUpdated(handleMessageUpdated);
        socket.offMessageDeleted(handleMessageDeleted);
        socket.offUserOnline(handleUserOnline);
        socket.offUserOffline(handleUserOffline);
        socket.offMessagesRead(handleMessagesRead);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && socket.isConnected() && isOnline) {
      handleConnect();
    }
  }, [socket, isOnline, clientId]);

  const handleUserList = (payload: UserListResponsePayloadInterface): void => {
    dispatch(setUsersPresence(payload));
  };

  const handleConnect = () => {
    const payload: UserListRequestPayloadInterface = { userId };
    socket.userList(payload, handleUserList);
  };

  const handleConversationCreated = (payload: ConversationCreatedResponsePayloadInterface) => {
    const conversation = conversationSchema(payload, { userId });

    if (payload.lastMessage) {
      conversation.lastMessage = messageSchema(conversation.lastMessage, {
        userId,
      });
    }

    dispatch(conversationCreated(conversation));

    if (conversation.isOwner) {
      messageRouter.navigateToConversation(conversation.id);
    }
  };

  const handleConversationExists = (payload: ConversationExistsResponsePayloadInterface) => {
    dispatch(
      conversationExists({
        id: payload.id,
        conversation: conversationSchema(payload.conversation, { userId }),
      }),
    );

    messageRouter.navigateToConversation(payload.id);
    setNextScreen(MessageCenterScreenEnum.CONVERSATION_SELECTED);

    if (payload.id) {
      initialFetch(payload.id);
    }
  };

  const handleMessageUpdated = (message: MessageCenterMessageInterface) => {
    dispatch(
      messageUpdated({
        message: messageSchema(message, { userId }),
      }),
    );
  };

  const handleMessageDeleted = (payload: MessageDeletedResponsePayloadInterface) => {
    dispatch(messageDeleted(payload));
  };

  const handleConversationMembersChanged = (payload: ConversationMembersChangedResponsePayloadInterface) => {
    dispatch(conversationMembersChanged(payload));
  };

  const handleMemberQuitConversation = (payload: MemberQuitConversationResponsePayloadInterface) => {
    dispatch(quitConversation(payload));
  };

  const handleUserOnline = (payload: UserOnlineResponsePayloadInterface) => {
    dispatch(userOnline(payload));
  };

  const handleUserOffline = (payload: UserOfflineResponsePayloadInterface) => {
    dispatch(userOffline(payload));
  };

  const handleConversationTitleChanged = (payload: ConversationTitleChangedResponsePayloadInterface) => {
    dispatch(conversationTitleChanged(payload));
  };

  const handleConversationArchived = (payload: ConverstionArchivedResponsePayloadInterface) => {
    dispatch(conversationArchived(payload));
  };

  const handleMessagesRead = (payload: MessagesReadResponsePayloadInterface) => {
    const { messageIds, conversationId, memberId } = payload;

    dispatch(
      markAsReadUnreadMessagesSuccess({
        messageIds,
        conversationId,
        userId,
        memberId,
      }),
    );
  };
};
