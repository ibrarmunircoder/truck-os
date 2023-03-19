import isEmailValidator from 'validator/lib/isEmail';
import * as yup from 'yup';

yup.addMethod<yup.StringSchema>(yup.string, 'validEmail', function (message) {
  // eslint-disable-next-line no-invalid-this
  return this.test('valid', message, (value) => typeof value === 'string' && isEmailValidator(value));
});

yup.addMethod<yup.StringSchema>(yup.string, 'uniqueEmail', function (message) {
  // eslint-disable-next-line no-invalid-this
  return this.test('unique', message, function (value, context) {
    // form[0] gives you current row, while the second index gives you full form data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { invites } = (context as any)?.from[1]?.value || {};
    // process validation only for valid values
    if (value && invites?.length) {
      const occurrenceCount = invites.filter((invite) => invite?.email === value)?.length;

      return occurrenceCount === 1;
    }
    return true;
  });
});

export { yup };
