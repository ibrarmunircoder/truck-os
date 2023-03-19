import {
  MessageCenterConversationInterface,
  MessageCenterUserInterface,
  selectActiveConversation,
  selectUser
} from 'modules/message-center';
import { useCurrentUser } from 'modules/message-center/hooks'
import { conversationSelector } from 'modules/message-center/selectors';
import { useDispatch, useSelector } from 'react-redux';

export interface UseSelectedConversationHookInterface {
  selected: Partial<MessageCenterConversationInterface> | null;
  select: (conversation: Partial<MessageCenterConversationInterface> | null) => void
  selectPerson: (chatUser: MessageCenterUserInterface) => void;
}

export const useSelectedConversation = (): UseSelectedConversationHookInterface => {
  const { id: userId } = useCurrentUser();
  const dispatch = useDispatch()
  const { selected } = useSelector(conversationSelector)

  const select = (conversation: Partial<MessageCenterConversationInterface> | null) => {
    dispatch(selectActiveConversation({ conversation }));
  }

  const selectPerson = (chatUser: MessageCenterUserInterface) => {
    const payload = {
      conversation: {
        id: chatUser.id,
        title: `${chatUser.firstName} ${chatUser.lastName}`,
        preview: chatUser.avatar,
        isNew: true,
        ownerId: userId,
        memberIds: [userId, chatUser.id],
      },
    };

    dispatch(selectUser(payload));
  };


  return {
    selected,
    select,
    selectPerson
  }
};
