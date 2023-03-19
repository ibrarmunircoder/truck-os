import { useRightClick } from 'modules/common/hooks';
import { createElement, FunctionComponent, ReactNode, SyntheticEvent } from 'react';

export interface RightClickListenerInterface {
  onRightClick: (event: SyntheticEvent<HTMLElement, Event>) => void;
  className?: string;
  children?: ReactNode;
}

export const RightClickListener: FunctionComponent<RightClickListenerInterface> = ({
  onRightClick,
  children,
  ...rest
}) => {
  const { containerRef: ref } = useRightClick<HTMLSpanElement>(onRightClick);

  return createElement('div', { ...rest, ref }, children);
};
