import { ExceptionPayload } from 'src/library/interfaces';
import { UtilityService } from 'src/library/services';

export const prepareError = (defaultMessage: string, errorCode: string, error?: any): ExceptionPayload => {
  const variables = error && error.variables ? error.variables : {};
  const message =
    error && error.message ? error.message : UtilityService.compileHandleBarTemplate(defaultMessage, variables);
  return {
    message,
    variables,
    errorCode,
  };
};
