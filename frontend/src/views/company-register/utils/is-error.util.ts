import { FormikErrors, FormikTouched, getIn } from 'formik';
import { isErrorMessage } from 'views/company-register/utils/is-error-message.util';

export const isError = (field: string, errros: FormikErrors<unknown>, touched: FormikTouched<unknown>): boolean =>
  getIn(touched, field) && Boolean(isErrorMessage(field, errros));
