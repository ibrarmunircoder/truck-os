/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRANSLATION_MAPPING } from 'configuration/common/translation-mapping';
import { ClientValidationError } from 'modules/common/errors';
import { extractPrimaryError } from 'modules/common/utils/';

export const formatErrorMessage = (error, t) => {
  let errMessage = error?.message;
  if (error.graphQLErrors) {
    errMessage = extractPrimaryError(error.graphQLErrors, t) || error.message;
  } else if (error instanceof ClientValidationError) {
    errMessage = t(errMessage, error.variables);
  }

  if (!window.navigator.onLine || error.message.includes('NetworkOffline')) {
    errMessage = TRANSLATION_MAPPING.GENERIC_NETWORK_OFFLINE
      ? t(TRANSLATION_MAPPING.GENERIC_NETWORK_OFFLINE)
      : 'Please check your internet connection first';
  }

  if (window.navigator.onLine && (error.networkError || error.message.includes('ECONNREFUSED'))) {
    // Masks: "NetworkError when attempting to fetch resource." & Connection errors
    errMessage = TRANSLATION_MAPPING.INTERNAL_SERVER_ERROR
      ? t(TRANSLATION_MAPPING.INTERNAL_SERVER_ERROR)
      : 'Something went wrong. Please try again later';
  }
  return errMessage;
};
