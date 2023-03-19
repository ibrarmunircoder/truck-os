import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRipple } from 'modules/common/hooks';
import { MessageCenterUserInterface } from 'modules/message-center';
import { useRecipientListItemStyles } from 'modules/message-center/components/message-center-chat/partials/recipient-list-item/recipient-list-item.styles';
import { useUserPresence } from 'modules/message-center/hooks';
import { FunctionComponent, HTMLAttributes, MouseEventHandler, ReactEventHandler } from 'react';

export interface RecipientListItemInterface extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  recipient: MessageCenterUserInterface;
  onClick?: ReactEventHandler<HTMLLIElement>;
}

export const RecipientListItemPartial: FunctionComponent<RecipientListItemInterface> = ({
  selected,
  recipient,
  onMouseDown,
  ...rest
}) => {
  const classes = useRecipientListItemStyles();

  const { fullName, initials, avatar } = recipient;
  const { isOnline } = useUserPresence(recipient.id);

  const { addRipple, ripples } = useRipple({});
  const handleMouseDown: MouseEventHandler<HTMLLIElement> = (event) => {
    addRipple(event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  };
  return (
    <ListItem
      classes={classes.item}
      onMouseDown={handleMouseDown}
      selected={selected}
      secondaryAction={selected && <CheckCircleOutlineIcon color="secondary" />}
      {...rest}
    >
      {ripples}
      <ListItemAvatar classes={classes.listItemAvatar}>
        <Badge variant="dot" color="success" invisible={!isOnline}>
          <Avatar src={avatar} classes={classes.avatar}>
            {initials}
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText disableTypography>
        <Typography variant="subtitle2">{fullName}</Typography>
      </ListItemText>
    </ListItem>
  );
};
