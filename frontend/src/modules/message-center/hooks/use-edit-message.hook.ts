import { StoreInterface } from 'configuration/redux/store';
import { MessageCenterMessageInterface, setEditingMessage } from 'modules/message-center';
import { useMessageCenterSocket } from 'modules/message-center/hooks';
import { messageSelector, selectMessageById } from 'modules/message-center/selectors';
import { MessageEditRequestPayloadInterface, SendMessageRequestPayloadInterface } from 'modules/message-center/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface UseEditMessageHookInterface {
  id: string;
  value: string;
  isEditing: boolean;
  setValue: (newBody: string) => void;
  edit: (updateMessage: SendMessageRequestPayloadInterface) => void;
  startEditing: (id: string) => void;
  endEditing: (id: string) => void;
}

export const useEditMessage = (): UseEditMessageHookInterface => {
  const dispatch = useDispatch();
  const [socket] = useMessageCenterSocket();
  const { active: activeId } = useSelector(messageSelector);

  const message: MessageCenterMessageInterface | null = useSelector<StoreInterface, MessageCenterMessageInterface>(
    (state) => selectMessageById(state, activeId),
  );

  const [value, setValue] = useState<string>('');
  const isEditing = message?.isEditing;

  useEffect(() => {
    setValue(message?.body);
  }, [activeId]);

  const edit = (updateMessage: SendMessageRequestPayloadInterface) => {
    if (!activeId) {
      return;
    }

    const { body, mentionedIds } = updateMessage;
    const payload: MessageEditRequestPayloadInterface = {
      id: activeId,
      body,
      mentionedIds,
    };

    socket.editMessage(payload);
  };

  const startEditing = (id: string) => {
    if (activeId) {
      endEditing(id);
    }

    dispatch(setEditingMessage({ id, isEditing: true }));
  };

  const endEditing = (id: string) => {
    dispatch(setEditingMessage({ id, isEditing: false }));
  };

  return {
    id: activeId,
    value,
    isEditing,
    setValue,
    edit,
    startEditing,
    endEditing,
  };
};
