import { MentionData } from '@draft-js-plugins/mention';
import { EntryComponentProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { MessageCenterUserInterface } from 'modules/message-center/message-center.slice';
import { FunctionComponent } from 'react';

export interface MentionItemInterface extends EntryComponentProps {
  mention: MentionData & MessageCenterUserInterface;
}

export const MentionItemPartial: FunctionComponent<MentionItemInterface> = ({
  mention,
  theme, // eslint-disable-line @typescript-eslint/no-unused-vars
  className, // eslint-disable-line @typescript-eslint/no-unused-vars
  searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
  isFocused,
  ...rest
}) => (
    <ListItem {...rest} selected={isFocused}>
      <ListItemAvatar>
        <Avatar src={mention.avatar} alt={mention.fullName}>
          {mention.initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>{mention.fullName}</ListItemText>
    </ListItem>
  );
