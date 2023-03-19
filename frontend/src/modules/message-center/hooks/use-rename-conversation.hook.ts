import { MessageCenterConversationEditingTypeEnum, setEditingConversation } from 'modules/message-center';
import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { conversationSelector } from 'modules/message-center/selectors';
import { RenameConversationRequestPayloadInterface } from 'modules/message-center/utils';
import { useDispatch, useSelector } from 'react-redux';

export interface UseRenameConversationHookInterface {
  id: string;
  type: MessageCenterConversationEditingTypeEnum;
  rename: (title: string) => void;
  startEditing: (id: string, type: MessageCenterConversationEditingTypeEnum) => void;
  endEditing: (id: string) => void;
}

export const useRenameConversation = (): UseRenameConversationHookInterface => {
  const [socket] = useMessageCenterSocket();
  const dispatch = useDispatch();

  const { editingId, editingType } = useSelector(conversationSelector);

  const rename = (title: string) => {
    const payload: RenameConversationRequestPayloadInterface = { conversationId: editingId, title };
    socket.renameConversation(payload);
  };

  const startEditing = (id: string, type: MessageCenterConversationEditingTypeEnum) => {
    if (editingId) {
      endEditing(editingId);
    }

    dispatch(setEditingConversation({ id, isEditing: true, type }));
  };

  const endEditing = (id: string) => {
    dispatch(setEditingConversation({ id, isEditing: false }));
  };

  return {
    id: editingId,
    type: editingType,
    rename,
    startEditing,
    endEditing,
  };
};
