import { FormikErrors } from 'formik';

export const authorDateOnChangeHandler = (
  date: Date,
  setFn: (
    field: string,
    value: string | number,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<unknown>>,
): void => {
  void setFn('birthDate', new Date(date).toDateString());
  const age = date ? new Date().getFullYear() - new Date(date).getFullYear() : 0;
  void setFn('age', age);
};
