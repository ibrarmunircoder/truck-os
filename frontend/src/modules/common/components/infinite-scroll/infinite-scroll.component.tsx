import { useCustomInfiniteScroll } from 'modules/common/hooks';
import { FunctionComponent, ReactNode, useCallback, useEffect, useRef } from 'react';
import { UseInfiniteScrollHookArgs } from 'react-infinite-scroll-hook';

export interface InfiniteScrollInterface extends UseInfiniteScrollHookArgs {
  className?: string;
  children: ReactNode;
  renderLoader: (ref) => void;
}

export const InfiniteScroll: FunctionComponent<InfiniteScrollInterface> = (props) => {
  const { refs } = useCustomInfiniteScroll(props);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [infiniteRef, { rootRef }] = refs;

  const scrollableRootRef = useRef<HTMLDivElement | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [props.loading, rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

  return (
    <div
      className={props.className}
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      style={{
        maxHeight: 500,
        maxWidth: 500,
        overflow: 'auto',
        backgroundColor: '#fafafa',
      }}
    >
      {/* <div ref={infiniteRef} /> */}

      {props.children}
      {!props.loading && props.hasNextPage && <div ref={infiniteRef}>has more</div>}
    </div>
  );
};
