import { RefObject, UIEventHandler, useRef, useState } from "react";

export interface UseScrollBottomHookInterface<P, C> {
  parentRef: RefObject<P>;
  containerRef: RefObject<C>;
  isBottom: boolean;
  setIsBottom: (isBottom: boolean) => void;
  onScroll: UIEventHandler<P>;
  scrollToBottom: () => void
}

export interface UseUserHookValuesInterface {
  thresholdBottom?: number;
}

export const useScrollBottom = <P extends HTMLElement, C extends HTMLElement>(values: UseUserHookValuesInterface): UseScrollBottomHookInterface<P, C> => {
  const parentRef = useRef<P>();
  const containerRef = useRef<C>();
  const [ isBottom, setIsBottom ] = useState(false);

  const onScroll = () => {
    const height = parentRef.current.clientHeight;
    const scrollPosition = parentRef.current.scrollHeight - parentRef.current.scrollTop - values.thresholdBottom;
    const bottom = scrollPosition <= height;

    if (bottom) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  const scrollToBottom = () => {
    containerRef?.current.scrollIntoView({ block: 'end' });
  };

  return {
    parentRef,
    containerRef,
    isBottom,
    setIsBottom,
    onScroll,
    scrollToBottom,
  };
};
