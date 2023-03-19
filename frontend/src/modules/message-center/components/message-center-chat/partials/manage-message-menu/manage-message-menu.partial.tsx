import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'modules/common/hooks';
import { useDeleteMessage, useEditMessage } from 'modules/message-center/hooks';
import { FunctionComponent } from "react";

export interface ManageMessageMenuItem extends MenuProps {
  messageId: string;
  onClose: () => void;
}

export const ManageMessageMenu: FunctionComponent<ManageMessageMenuItem> = ({
  messageId,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();
  const { startEditing } = useEditMessage()
  const { deleteOne } = useDeleteMessage()

  const handleEditClick = () => {
    startEditing(messageId);
    onClose();
  }

  const handleDeleteClick = () => {
    deleteOne(messageId);
    onClose();
  }

   return (
    <Menu anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} onClose={onClose} {...rest}>
      <MenuItem onClick={handleEditClick}>
        <EditOutlinedIcon />
        <span>{t('message-menu.edit')}</span>
      </MenuItem>
      <MenuItem onClick={handleDeleteClick} >
        <DeleteOutlinedIcon />
        <span>{t('message-menu.delete')}</span>
      </MenuItem>
    </Menu>
  )
}
