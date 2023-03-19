import { useCustomInfiniteScroll, useTranslation } from 'modules/common/hooks';
import { MessageUserGroupItemPartial } from 'modules/message-center/components/message-center-chat/partials';
import { MessageDateGroupItemPartial } from 'modules/message-center/components/message-center-chat/partials/message-date-group-item/message-date-group-item.partial';
import { useSelectedConversationMessageHistoryStyles } from 'modules/message-center/components/message-center-chat/partials/selected-conversation-message-history/selected-conversation-message-history.styles';
import { useCurrentUser, useFetchMessages, useReadMessages } from 'modules/message-center/hooks';
import { conversationSelector, messageSelector } from 'modules/message-center/selectors';
import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { useSelector } from 'react-redux';

export interface SelectedConversationMessageHistoryInterface extends HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  /**
   * The distance in pixels when last message is visible
   */
  thresholdBottom?: number;
}

const dateToKey = (d: Date) => d.getTime();

// eslint-disable-next-line max-len
export const SelectedConversationMessageHistoryPartial: FunctionComponent<SelectedConversationMessageHistoryInterface> =
  ({ thresholdBottom = 120 }) => {
    const classes = useSelectedConversationMessageHistoryStyles();
    const { t } = useTranslation();
    const { history } = useSelector(messageSelector);
    const { selected: selectedConversation } = useSelector(conversationSelector);
    const { isLoading, hasMore, loadedTotal, fetchMore } = useFetchMessages();
    const { readMessages } = useReadMessages();

    const { id: userId } = useCurrentUser();
    const { isGroup, owner } = selectedConversation;

    const isEmpty = !hasMore && loadedTotal === 0;
    const conversationTitle = isGroup ? selectedConversation.title : owner?.fullName;

    const {
      refs: [infiniteRef, { rootRef }],
    } = useCustomInfiniteScroll({
      loading: isLoading,
      hasNextPage: hasMore,
      onLoadMore: fetchMore,
      rootMargin: `${thresholdBottom}px 0px 0px 0px`,
    });

    const scrollableRootRef = React.useRef<HTMLDivElement | null>(null);
    const lastScrollDistanceToBottomRef = React.useRef<number>();

    useEffect(() => {
      lastScrollDistanceToBottomRef.current = 0;

      if (!hasMore) {
        readMessages();
      }
    }, [selectedConversation]);

    // We keep the scroll position when new items are added etc.
    useEffect(() => {
      const scrollableRoot = scrollableRootRef.current;
      const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
      if (scrollableRoot) {
        scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
      }

      if (lastScrollDistanceToBottom <= thresholdBottom) {
        readMessages();
      }
    }, [loadedTotal, rootRef]);

    const rootRefSetter = React.useCallback(
      (node: HTMLDivElement) => {
        rootRef(node);
        scrollableRootRef.current = node;
      },
      [rootRef],
    );

    const handleRootScroll = React.useCallback(() => {
      const rootNode = scrollableRootRef.current;
      if (rootNode) {
        const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
        lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
      }
    }, []);

    return (
      <div className={classes.root}>
        <div className={classes.container} ref={rootRefSetter} onScroll={handleRootScroll}>
          <div className={classes.list}>
            {hasMore && !isLoading && (
              <div ref={infiniteRef} className={classes.loader}>
                <h4 key="loading">Loading...</h4>
              </div>
            )}

            {isEmpty ? (
              <div key="empty" className={classes.emptyMessage}>
                <p className={classes.emptyMessageLabel}>
                  {t('conversation-beginning-message', { conversationTitle })}
                </p>
              </div>
            ) : (
              history.map(({ date, groups }) => (
                <MessageDateGroupItemPartial date={date} key={dateToKey(date)}>
                  {groups.map(({ author, messages }) => (
                    <MessageUserGroupItemPartial
                      key={`${dateToKey(date)}_${author.id}_${messages[0]?.id}`}
                      isAuthor={userId === author.id}
                      author={author}
                      messages={messages}
                    />
                  ))}
                </MessageDateGroupItemPartial>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
