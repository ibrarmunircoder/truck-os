import { usePasswordValidation, useRepeatPasswordValidation } from 'modules/auth/hooks';
import { yup } from 'modules/common/validation';

// Password Special Characters
// https://www.owasp.org/index.php/Password_special_characters

export const useRestorePasswordFormSchema = (): yup.AnyObjectSchema =>
  yup.object({
    password: usePasswordValidation(),
    repeatPassword: useRepeatPasswordValidation(),
  });
