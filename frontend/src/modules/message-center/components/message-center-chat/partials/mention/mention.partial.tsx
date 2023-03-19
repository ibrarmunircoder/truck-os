import clsx from 'clsx';
import { FunctionComponent, HTMLAttributes } from 'react';

export interface MentionInterface extends HTMLAttributes<HTMLSpanElement> {
  userId: string;
  name: string;
}

export const MentionPartial: FunctionComponent<MentionInterface> = ({
  className,
  userId,
  name,
  ...rest
}) => {
  const classes = {
    wrapper: clsx('font-bold underline cursor-pointer', className) 
  }

  return (
    <span className={classes.wrapper} title={name} data-user-id={userId} {...rest}>{name}</span>
  );
};
