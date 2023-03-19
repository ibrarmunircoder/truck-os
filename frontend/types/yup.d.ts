// eslint-disable-next-line @roq/filename-suffix-mismatch
import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    validEmail(message?: string): StringSchema<TType, TContext>;
    uniqueEmail(message?: string): StringSchema<TType, TContext>;
  }
}
