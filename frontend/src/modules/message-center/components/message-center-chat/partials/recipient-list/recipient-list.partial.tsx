import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useCustomInfiniteScroll } from 'modules/common/hooks';
import { useRecipientListStyles } from 'modules/message-center/components/message-center-chat/partials/recipient-list/recipient-list.style';
import { RecipientListItemPartial } from 'modules/message-center/components/message-center-chat/partials/recipient-list-item/recipient-list-item.partial';
import { useFetchRecipients, useSelectRecipients } from 'modules/message-center/hooks';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';

export interface InfiniteRecipientListInterface extends HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  /**
   * The distance in pixels when last message is visible
   */
  thresholdBottom?: number;
  /**
   * Authoload
   */
  initialLoad?: boolean;
}

export const RecipientListPartial: FunctionComponent<InfiniteRecipientListInterface> = ({
  threshold = 140,
  thresholdBottom = 60,
  initialLoad = true,
}) => {
  const classes = useRecipientListStyles();
  const { recipients, limit, isLoading, hasMore, initialFetch, fetchMore, loadedTotal } = useFetchRecipients();
  const { isSelected, toggle: toggleRecipient } = useSelectRecipients();

  useEffect(() => {
    if (initialLoad) {
      initialFetch({
        limit,
        offset: loadedTotal,
        filter: '',
      });
    }
  }, []);

  const handleRecipientClick = (id: string) => () => toggleRecipient(id);

  const {
    refs: [infiniteRef, { rootRef }],
  } = useCustomInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: fetchMore,
    rootMargin: `0px 0px ${thresholdBottom}px 0px`,
    delayInMs: threshold,
  });

  return (
    <div className={classes.root}>
      <Box ref={rootRef} className={classes.container}>
        <List classes={classes.list} disablePadding>
          {recipients.map((recipient) => (
            <RecipientListItemPartial
              key={recipient?.roqIdentifier}
              recipient={recipient}
              selected={isSelected(recipient?.roqIdentifier)}
              onClick={handleRecipientClick(recipient?.roqIdentifier)}
            />
          ))}

          {hasMore && (
            <ListItem ref={infiniteRef}  classes={classes.loader}>
              <h4 key="loading">
                Loading...
              </h4>
            </ListItem>
          )}
        </List>
      </Box>
    </div>
  );
};
