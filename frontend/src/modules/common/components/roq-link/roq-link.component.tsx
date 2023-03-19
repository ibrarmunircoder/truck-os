/* eslint-disable @typescript-eslint/ban-types */
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { useRouter } from 'modules/common/hooks';
import { RouteUrlInterface } from 'modules/common/interfaces';
import NextLink from 'next/link';
import { ParsedUrlQueryInput } from 'querystring';
import { forwardRef } from 'react';

export interface RoqLinkInterface extends Omit<MuiLinkProps, 'href'> {
  href?: string | undefined | null | RouteUrlInterface;
  route?: string;
  locale?: string;
  query?: ParsedUrlQueryInput;
}

export const RoqLink = forwardRef<HTMLAnchorElement, RoqLinkInterface>(function Link(props, ref) {
  const { children, href, locale, ...others } = props;
  const { createPath } = useRouter();
  const muiLink = (
    <MuiLink {...others} ref={ref}>
      {children}
    </MuiLink>
  );

  return href ? (
    <NextLink href={createPath(href)} locale={locale} passHref>
      {muiLink}
    </NextLink>
  ) : (
    muiLink
  );
});
