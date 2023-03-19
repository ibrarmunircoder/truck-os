/* eslint-disable @typescript-eslint/ban-types, @roq/filename-suffix-mismatch */
import isString from 'lodash/isString';
import { RouteUrlInterface } from 'modules/common/interfaces';
import { getRouteByPathname, getRoutePathname } from 'modules/common/utils/routing';
import { resolveHref } from "next/dist/shared/lib/router/router";
import nextRouter, { NextRouter, useRouter as useNextRouter } from 'next/router';
import { useMemo } from 'react';
import { UrlObject } from 'url';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

export type Url = RouteUrlInterface | string;

export type NextUrl = UrlObject | string;

interface UseRouterInterface extends NextRouter {
  createPath: (url: Url) => NextUrl;
  route: string;
  push: (url: Url, as?: Url, options?: TransitionOptions)=> Promise<boolean>;
  replace: (url: Url, as?: Url, options?: TransitionOptions)=>Promise<boolean>;
}

function preparePath(url: Url, currentLocale: string): NextUrl {
  if (isString(url)) {
    return url;
  }
  const { route, query, locale: urlLocale, ...rest } = url;
  const pathname = getRoutePathname(route, urlLocale || currentLocale);
  const [, path] = resolveHref(nextRouter, {pathname, query}, true);
  return route ? { ...rest, pathname: path } : { ...rest, query };
}

export const useRouter = (): UseRouterInterface => {
  const router = useNextRouter();
  const createPath = (url: Url) => preparePath(url, router.locale);

  return useMemo(
    () => ({
      ...router,
      createPath,
      route: getRouteByPathname(router.pathname),
      push: (url: Url, as?: Url, options?: TransitionOptions): Promise<boolean> =>
        router.push(createPath(url), as ? createPath(as) : createPath(url), { locale: router.locale , ...options }),
      replace: (url: Url, as?: Url, options?: TransitionOptions): Promise<boolean> =>
        router.replace(createPath(url), as ? createPath(as) : createPath(url), { locale: router.locale , ...options }),
    }),
    [router, createPath],
  );
};
