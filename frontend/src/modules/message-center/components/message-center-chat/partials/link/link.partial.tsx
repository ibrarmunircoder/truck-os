import clsx from 'clsx';
import React, { FunctionComponent, HTMLAttributes } from 'react';

export interface LinkInterface extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  ignoreClick?: boolean;
}

export const LinkPartial: FunctionComponent<LinkInterface> = ({
  className,
  href,
  ignoreClick,
  ...rest
}) => {
  const classes = {
    link: clsx('font-bold inline-flex items-center', className, {
      'underline cursor-pointer': !ignoreClick,
    })
  }

  const handlePreventClick = (e) => {
    e.preventDefault()
  }

  return (
    <a className={classes.link} href={href} onClick={ignoreClick && handlePreventClick} target="_blank" rel="noreferrer" {...rest}>
     {href}
    </a>
  )
};
