import { StoreInterface } from 'configuration/redux/store';
import { MessageCenterUserPresenceInterface } from 'modules/message-center';
import { selectPresenceById } from 'modules/message-center/selectors';
import { useSelector } from 'react-redux';

export interface UseUserPresenceHookInterface {
  isOnline: boolean;
}

export const useUserPresence = (id: string): UseUserPresenceHookInterface => {
  const precence: MessageCenterUserPresenceInterface | null = useSelector<StoreInterface, MessageCenterUserPresenceInterface>(
    state => selectPresenceById(state, id)
  )

  return {
    isOnline: precence?.isOnline
  };
};
