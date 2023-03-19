/* eslint-disable @roq/name-of-class-and-function-rule, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @roq/name-of-class-and-function-rule */
import { i18n } from 'configuration/app';
import localizedRoutes from 'routes/localized';

export function getRoutePathname(name: string, locale: string, query?: any): string {
  const routesConfig = localizedRoutes[locale] ?? localizedRoutes[i18n.defaultLocale];
  return routesConfig?.[name]?.pathname || '/';
}

export function getRouteByPathname(pathname: string): string {
  const routesConfig = localizedRoutes[i18n.defaultLocale];
  return Object.entries(routesConfig || {}).find(
    ([_, params]) => (params as { pathname: string }).pathname === pathname,
  )?.[0];
}
