import { MessageCenterScreenEnum, setScreen } from 'modules/message-center/message-center.slice';
import { messageCenterSelector } from 'modules/message-center/selectors';
import { useDispatch, useSelector } from 'react-redux';

export interface UseMessageCenterScreenHookInterface {
  screen: MessageCenterScreenEnum;
  set: (nextScreen: MessageCenterScreenEnum) => void
  isConversationSelected: boolean;
  isConversationNotSelected: boolean;
  isCreateNew: boolean;
}

export const useMessageCenterScreen = (): UseMessageCenterScreenHookInterface => {
  const dispatch = useDispatch();
  const { screen } = useSelector(messageCenterSelector)

  const set = (nextScreen: MessageCenterScreenEnum) => {
    dispatch(setScreen(nextScreen))
  }

  const isConversationSelected = screen === MessageCenterScreenEnum.CONVERSATION_SELECTED;
  const isConversationNotSelected = screen === MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED;
  const isCreateNew = screen === MessageCenterScreenEnum.CREATE_NEW;

  return {
    screen,
    set,
    isConversationSelected,
    isConversationNotSelected,
    isCreateNew,
  }
};
