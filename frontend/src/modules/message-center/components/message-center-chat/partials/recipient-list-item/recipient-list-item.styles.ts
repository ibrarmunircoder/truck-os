import { Theme } from '@mui/material';
import { AvatarClasses } from '@mui/material/Avatar';
import { ListItemClasses } from '@mui/material/ListItem';
import { ListItemAvatarClasses } from '@mui/material/ListItemAvatar';
import { roqMakeStyles } from 'modules/common/utils';

export interface RecipientListItemClasses {
  item?: ListItemClasses;
  listItemAvatar?: ListItemAvatarClasses;
  avatar?: AvatarClasses;
}
export const useRecipientListItemStyles = roqMakeStyles<RecipientListItemClasses>((theme: Theme) => ({
  'item--root': {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[800],
    },
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.75),
    margin: theme.spacing(0.75, 0, 0.75),
    overflow: 'hidden',
  },
  'item--selected': {
    backgroundColor: theme.palette.grey[200],
  },
  'item--secondaryAction': {
    display: 'flex',
  },
  'listItemAvatar--root': {
    marginRight: theme.spacing(0.5)
  },
  'avatar--root': {
    backgroundColor: theme.palette.secondary.main,
    width: 48,
    height: 48,
  }
}));


