import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { useMentionsPopoverStyles } from 'modules/message-center/components/message-center-chat/partials/mentions-popover/mentions-popover.styles';
import { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';

export interface MentionsPopoverInterface extends HTMLAttributes<HTMLDivElement> {}

export const MentionsPopoverPartial = forwardRef<HTMLDivElement, MentionsPopoverInterface>(
  ({ children, ...rest }, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes = useMentionsPopoverStyles();

    return (
      <Paper classes={classes.wrapper} ref={ref} {...rest}>
        <List>{children}</List>
      </Paper>
    );
  },
);

MentionsPopoverPartial.displayName = 'MentionsPopover';
