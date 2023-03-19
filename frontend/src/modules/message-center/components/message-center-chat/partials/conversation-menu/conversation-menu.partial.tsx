import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StoreInterface } from 'configuration/redux/store';
import { useTranslation } from 'modules/common/hooks';
import {
  MessageCenterConversationEditingTypeEnum,
  MessageCenterConversationInterface,
  MessageCenterScreenEnum,
} from 'modules/message-center';
import { useConversationMenuStyles } from 'modules/message-center/components/message-center-chat/partials/conversation-menu/conversation-menu.style';
import {
  useArchiveConversation,
  useCurrentUser,
  useFetchMessages,
  useLeaveConversation,
  useMessageCenterChatRouter,
  useMessageCenterScreen,
  useRenameConversation,
  useSelectedConversation,
} from 'modules/message-center/hooks';
import { selectConversationById } from 'modules/message-center/selectors';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';

export interface ConversationMenuInterface extends MenuProps {
  id: string;
  location: MessageCenterConversationEditingTypeEnum;
  onClose: () => void;
}

export const ConversationMenuPartial: FunctionComponent<ConversationMenuInterface> = ({
  id,
  location,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();
  const { set: setScreen } = useMessageCenterScreen();
  const { id: userId } = useCurrentUser();
  const { initialFetch } = useFetchMessages();
  const { leave } = useLeaveConversation();
  const { id: editingId, startEditing } = useRenameConversation();
  const { archive } = useArchiveConversation();
  const { navigateToConversationAddMembers, navigateToConversationRemoveMembers } = useMessageCenterChatRouter();

  const { selected: selectedConversation, select: selectConversation } = useSelectedConversation();
  const conversation: MessageCenterConversationInterface | null = useSelector<
    StoreInterface,
    MessageCenterConversationInterface
  >((state) => selectConversationById(state, id));
  const isAdmin = conversation.ownerId === userId;

  const classes = useConversationMenuStyles();

  const handleMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleAddUsersClick: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    selectConversation(conversation);
    setScreen(MessageCenterScreenEnum.CONVERSATION_ADD_MEMBERS);
    navigateToConversationAddMembers(conversation.id);
    onClose();
  };

  const handleRemoveUsersClick: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    selectConversation(conversation);
    setScreen(MessageCenterScreenEnum.CONVERSATION_REMOVE_MEMBERS);
    navigateToConversationRemoveMembers(conversation.id);
    onClose();
  };

  const handleRenameGroup: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    startEditing(id, location);

    if (editingId === id) {
      return onClose();
    }

    if (id !== selectedConversation?.id) {
      selectConversation(conversation);
      initialFetch(conversation.id);
    }

    onClose();
  };

  const handleLeaveGroup: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    leave(id);
    onClose();
  };

  const handleArchiveGroup: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    archive(id);
    onClose();
  };

  return (
    <Menu onClose={onClose} {...rest}>
      {isAdmin && (
        <MenuItem onClick={handleRenameGroup} onMouseDown={handleMouseDown} classes={classes.menuItem}>
          <EditOutlinedIcon className={classes.menuIcon} />
          <span>{t('conversation-menu.rename-group')}</span>
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={handleArchiveGroup} onMouseDown={handleMouseDown} classes={classes.menuItem}>
          <ArchiveOutlinedIcon className={classes.menuIcon} />
          <span>{t('conversation-menu.archive-group')}</span>
        </MenuItem>
      )}
      {!isAdmin && (
        <MenuItem onClick={handleLeaveGroup} onMouseDown={handleMouseDown} classes={classes.menuItem}>
          <LogoutOutlinedIcon className={classes.menuIcon} />
          <span>{t('conversation-menu.leave-group')}</span>
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={handleAddUsersClick} onMouseDown={handleMouseDown} classes={classes.menuItem}>
          <AddCircleOutlineIcon className={classes.menuIcon} />
          <span>{t('conversation-menu.add-user')}</span>
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={handleRemoveUsersClick} onMouseDown={handleMouseDown} classes={classes.removeMenuItem}>
          <RemoveCircleOutlineIcon className={classes.menuIcon} />
          <span>{t('conversation-menu.remove-user')}</span>
        </MenuItem>
      )}
    </Menu>
  );
};
