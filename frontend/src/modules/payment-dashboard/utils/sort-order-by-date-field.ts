import { Order } from 'modules/payment-dashboard/interfaces';

export const sortOrderByDateField = (field: string) => (a: Order, b: Order): number =>
  new Date(a[field]).getTime() > new Date(b[field]).getTime() ? -1 : 1;
