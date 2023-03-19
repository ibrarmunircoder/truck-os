import { useRouter } from 'modules/common/hooks';

export interface UseMessageCenterChatRouterHookInterface {
  navigateToConversation: (id: string) => void;
  navigateToNewConversation: () => void;
  navigateToConversationAddMembers: (id: string) => void;
  navigateToConversationRemoveMembers: (id: string) => void;
  navigateToInitial: () => void;
}

export const useMessageCenterChatRouter = (): UseMessageCenterChatRouterHookInterface => {
  const { push } = useRouter();
  const route = 'message-center';
  const navigateToConversation = (id: string) => push({
    route,
    search: new URLSearchParams({ id }).toString(),
  }, undefined, { shallow: true })

  const navigateToNewConversation = () => push({
    route,
    search: new URLSearchParams({
      new: 'conversation'
    }).toString()
  }, undefined, { shallow: true })

  const navigateToConversationAddMembers = (id: string) => push({
    route,
    search: new URLSearchParams({
      id,
      members: 'add'
    }).toString()
  }, undefined, { shallow: true })

  const navigateToConversationRemoveMembers = (id: string) => push({
    route,
    search: new URLSearchParams({
      id,
      members: 'remove'
    }).toString()
  }, undefined, { shallow: true })

  const navigateToInitial = () => push({ route }, undefined, { shallow: true })

  return {
    navigateToConversation,
    navigateToNewConversation,
    navigateToConversationAddMembers,
    navigateToConversationRemoveMembers,
    navigateToInitial
  };
};
