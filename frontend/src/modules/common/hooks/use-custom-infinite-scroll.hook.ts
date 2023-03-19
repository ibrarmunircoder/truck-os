import useInfiniteScroll , { UseInfiniteScrollHookArgs, UseInfiniteScrollHookResult } from 'react-infinite-scroll-hook';

export interface useCustomInfiniteScrollInterface {
  refs: UseInfiniteScrollHookResult;
}

export const useCustomInfiniteScroll = (values: UseInfiniteScrollHookArgs): useCustomInfiniteScrollInterface  => {
  const { loading, onLoadMore, hasNextPage, rootMargin } = values;

  const hookResult = useInfiniteScroll({
    loading,
    onLoadMore,
    hasNextPage,
    rootMargin
  });
  
  return {
    refs: hookResult
  }
};
