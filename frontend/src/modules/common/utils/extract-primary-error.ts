/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TRANSLATION_MAPPING } from 'configuration/common/translation-mapping';
import snakeCase from 'lodash/snakeCase';
/* eslint-enable @typescript-eslint/no-explicit-any */

// @todo: for now we display only the message corresponding to the first error message.
// we can possibly return an array of messages and create multiple alerts as well.
export const extractPrimaryError = (errorDetails, t) => {
  const firstErrorInstance = errorDetails[0] || errorDetails;
  let msg = firstErrorInstance.message || '';
  if (firstErrorInstance.extensions && firstErrorInstance.extensions.response) {
    const errorSchema = firstErrorInstance.extensions.response;
    if (errorSchema.variables?.isValidationError) {
      const property = errorSchema.variables.property;

      const translationKeyForProperty = property === 'entityUUID' ? 'ENTITY_UUID' : snakeCase(property).toUpperCase();
      const translatedProperty = TRANSLATION_MAPPING[translationKeyForProperty]
        ? t(TRANSLATION_MAPPING[translationKeyForProperty])
        : property;
      const translatedVariableDetails = {
        property: translatedProperty,
        each: errorSchema.variables.each ? t('each') : undefined,
      };
      msg = TRANSLATION_MAPPING[errorSchema.errorCode]
        ? t(TRANSLATION_MAPPING[errorSchema.errorCode], { ...errorSchema.variables, ...translatedVariableDetails })
        : errorSchema.message;
    } else {
      msg = TRANSLATION_MAPPING[errorSchema.errorCode]
        ? t(TRANSLATION_MAPPING[errorSchema.errorCode], { ...errorSchema.variables })
        : errorSchema.message;
    }
  }
  return msg;
};
