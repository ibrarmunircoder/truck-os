import { setSelectedRecipients, toggleRecipient } from 'modules/message-center';
import { recipientSelector } from 'modules/message-center/selectors';
import { useDispatch, useSelector } from 'react-redux';

export interface UseSelectRecipientsHookInterface {
  selectedIds: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  selectMany: (ids: string[]) => void;
}

export const useSelectRecipients = (): UseSelectRecipientsHookInterface => {
  const dispatch = useDispatch();
  const { selectedIds } = useSelector(recipientSelector)

  const toggle = (id: string) => {
    dispatch(toggleRecipient(id))
  }

  const selectMany = (ids: string[]) => {
    dispatch(setSelectedRecipients(ids))
  }

  const isSelected = (id: string) => selectedIds.includes(id)

  return {
    isSelected,
    selectedIds,
    toggle,
    selectMany
  }
};
