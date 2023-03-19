import { UrlObject } from 'url';

export interface RouteUrlInterface extends UrlObject {
  route?: string;
  locale?: string;
}
