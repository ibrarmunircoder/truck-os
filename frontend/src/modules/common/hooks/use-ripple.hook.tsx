import { CSSProperties, MouseEvent, useState } from 'react';

const MINIMUM_RIPPLE_SIZE = 22;

export interface RippleInterface {
  key: number;
  style: CSSProperties;
}

export interface UseRippleHookInterface {
  addRipple: (event: MouseEvent<HTMLElement, Event>) => void;
  ripples: JSX.Element[];
}

export const useRipple = (style: CSSProperties = {}): UseRippleHookInterface => {
  const [ripples, setRipples] = useState([]);

  const showRipple = (event: MouseEvent<HTMLElement>): void => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x: number = event.clientX - left;
    const y: number = event.clientY - top;
    const maxSize: number = Math.max(event.currentTarget.clientWidth, event.currentTarget.clientHeight);
    const rippleSize: number = Math.max(maxSize / 7.0, MINIMUM_RIPPLE_SIZE);
    const duration: number = Math.max(1, 0.7 * Math.round(rippleSize / (MINIMUM_RIPPLE_SIZE * 3)));

    const newRipple: RippleInterface = {
      key: event.timeStamp,
      style: {
        display: 'block',
        width: rippleSize,
        height: rippleSize,
        position: 'absolute',
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        background: 'currentColor',
        borderRadius: '50%',
        opacity: 0.4,
        pointerEvents: 'none',
        animationName: 'useRippleAnimation',
        animationDuration: `${duration}s`,
        ...style,
      },
    };

    setRipples((state) => [...state, newRipple]);
  };

  const ripplesArray: JSX.Element[] = ripples.map((currentRipple) => {
    const handleAnimationEnd = (): void => {
      setRipples((state) => state.filter((previousRipple) => previousRipple.key !== currentRipple.key));
    };

    return <span key={currentRipple.key} {...currentRipple} onAnimationEnd={handleAnimationEnd} />;
  });

  return {
    addRipple: showRipple,
    ripples: ripplesArray,
  };
};
